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
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_model_1 = __importDefault(require("../models/user.model"));
const router = (0, express_1.Router)();
// Common login route for all users
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log({ email, password });
        // validate
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });
        const user = yield user_model_1.default.findOne({ email: email });
        if (!user)
            return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        // const isMatch =password===user.password;
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials." });
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            role: user.role === "admin" ? "admin" : "business",
        }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role, // Include the user's role in the response
            },
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        console.log("this is the error", err);
    }
}));
// Check if token is valid
router.post("/tokenIsValid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res.json(false);
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.json(false);
        const user = yield user_model_1.default.findById(verified.id);
        if (!user)
            return res.json(false);
        return res.json(true);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}));
// Common protected route for all users
router.get("/", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(req.body.user);
    res.json({
        displayName: user.name,
        id: user._id,
        role: user.role, // Include the user's role in the response
    });
}));
exports.default = router;
