import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import User from '../models/user.model';
import bcrypt from "bcryptjs";

async function createUser(req: Request, res: Response) {
  try {
    const { email, password, name, phone, address, status, role } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordCrypt= await bcrypt.hash(password, salt);
    const newUser: IUser = new User({ email, password: passwordCrypt, name, phone, address, status, role, deleted: false });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating user' });
  }
}

async function getAllUsers(req: Request, res: Response) {
  try {
    const users: IUser[] = await User.find({ deleted: false });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
}

async function getUserById(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user: IUser | null = await User.findById(userId).where({ deleted: false });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const { email, password, name, phone, address, status } = req.body;
    const updatedUser: IUser | null = await User.findByIdAndUpdate(
      userId,
      { email, password, name, phone, address, status },
      { new: true }
    ).where({ deleted: false });

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const softDeletedUser: IUser | null = await User.findByIdAndUpdate(
      userId,
      { deleted: true }
    );

    if (softDeletedUser) {
      res.json({ message: 'User soft-deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error soft-deleting user' });
  }
}

export {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
