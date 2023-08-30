"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (requiredRole = null) => {
    return (req, res, next) => {
        try {
            const token = req.header('x-auth-token');
            if (!token)
                return res.status(401).json({ msg: 'No authentication token, access denied' });
            const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!verified)
                return res.status(401).json({ msg: 'Token verification failed, authorization denied' });
            if (verified.role !== "admin" && verified.role !== "business")
                return res.status(403).json({ msg: 'Unauthorized' });
            if (requiredRole &&
                (typeof requiredRole === 'string' && verified.role !== requiredRole) ||
                (Array.isArray(requiredRole) && !requiredRole.includes(verified.role))) {
                return res.status(403).json({ msg: 'Insufficient permissions for this resource' });
            }
            req.body.user = verified.id;
            req.body.userRole = verified.role;
            next();
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    };
};
exports.default = auth;
