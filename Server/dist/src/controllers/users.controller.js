"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, name, phone, address, status, role } = req.body;
            const salt = yield bcryptjs_1.default.genSalt();
            const passwordCrypt = yield bcryptjs_1.default.hash(password, salt);
            const newUser = new user_model_1.default({ email, password: passwordCrypt, name, phone, address, status, role, deleted: false });
            const savedUser = yield newUser.save();
            res.status(201).json(savedUser);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating user' });
        }
    });
}
exports.createUser = createUser;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.default.find({ deleted: false });
            res.json(users);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching users' });
        }
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const user = yield user_model_1.default.findById(userId).where({ deleted: false });
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching user' });
        }
    });
}
exports.getUserById = getUserById;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const { email, password, name, phone, address, status } = req.body;
            const updatedUser = yield user_model_1.default.findByIdAndUpdate(userId, { email, password, name, phone, address, status }, { new: true }).where({ deleted: false });
            if (updatedUser) {
                res.json(updatedUser);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating user' });
        }
    });
}
exports.updateUser = updateUser;
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.params.id;
            const softDeletedUser = yield user_model_1.default.findByIdAndUpdate(userId, { deleted: true });
            if (softDeletedUser) {
                res.json({ message: 'User soft-deleted successfully' });
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error soft-deleting user' });
        }
    });
}
exports.deleteUser = deleteUser;
