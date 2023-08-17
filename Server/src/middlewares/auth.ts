import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const auth = (requiredRole: string | string[] = null) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('x-auth-token');

      if (!token)
        return res.status(401).json({ msg: 'No authentication token, access denied' });
      
      const verified = jwt.verify(token, process.env.JWT_SECRET) as { id: string, role: string };

      if (!verified)
        return res.status(401).json({ msg: 'Token verification failed, authorization denied' });


      if (verified.role !== "admin" && verified.role !== "business")
        return res.status(403).json({ msg: 'Unauthorized' });
  

      if (requiredRole && 
          (typeof requiredRole === 'string' && verified.role !== requiredRole) ||
          (Array.isArray(requiredRole) && !requiredRole.includes(verified.role))
      ) {
        return res.status(403).json({ msg: 'Insufficient permissions for this resource' });
      }

      req.body.user = verified.id;
      req.body.userRole = verified.role; 
      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};

export default auth;