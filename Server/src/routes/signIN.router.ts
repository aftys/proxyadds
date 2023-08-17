import { Router, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../middlewares/auth";
import User from "../models/user.model";

const router = Router();

// Common login route for all users
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });

    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials." });

      const token = jwt.sign({
        id: user._id,
        role: user.role === "admin" ? "admin" : "business",
      }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role, // Include the user's role in the response
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("this is the error", err);
  }
});

// Check if token is valid
router.post("/tokenIsValid", async (req: Request, res: Response) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);

    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Common protected route for all users
router.get("/", auth, async (req: Request, res: Response) => {
  const user = await User.findById(req.body.user);
  res.json({
    displayName: user.name,
    id: user._id,
    role: user.role, // Include the user's role in the response
  });
});

export default router;