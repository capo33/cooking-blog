"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.getUsers = exports.deleteUserByAdmin = exports.deleteUserByUser = exports.updateProfile = exports.forgotPassword = exports.getProfile = exports.logout = exports.login = exports.register = void 0;
const bcrypt = __importStar(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const Recipe_1 = __importDefault(require("../models/Recipe"));
const generateToken_1 = require("../utils/generateToken");
// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, answer } = req.body;
    try {
        // Check if user already exists
        const existingUser = yield User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }
        // Check the length of the password
        if (password.length < 6) {
            return res
                .status(400)
                .json({ msg: "Password must be at least 6 characters" });
        }
        // Check if fields are empty
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "Please fill all fields" });
        }
        // generate salt to hash password
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const newUser = yield User_1.default.create({
            name,
            email,
            password: hashedPassword,
            answer,
        });
        // generate token
        const token = (0, generateToken_1.generateToken)(newUser._id);
        // Take out password from response
        const _a = newUser.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]); // we use toObject() instead of _doc in typescript to get the user object without the password
        // send response
        res.status(201).json(Object.assign({ success: true, message: "User created successfully", token }, userWithoutPassword));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
});
exports.register = register;
// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const existingUser = yield User_1.default.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        // Check if password matches
        const isMatch = yield bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        // generate token
        const token = (0, generateToken_1.generateToken)(existingUser === null || existingUser === void 0 ? void 0 : existingUser._id);
        // Take out password from response
        const _b = existingUser.toObject(), { password: _ } = _b, userWithoutPassword = __rest(_b, ["password"]);
        // send response
        res.status(200).json(Object.assign({ success: true, message: "User logged in successfully", token }, userWithoutPassword));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
});
exports.login = login;
// @desc    Logout a user
// @route   GET /api/v1/auth/logout
// @access  Private
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ success: true, message: "User logged out" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
});
exports.logout = logout;
// @desc    Get user profile
// @route   GET /api/v1/auth/profile
// @access  Private
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        // get user from req.user
        const user = yield User_1.default.findById((_c = req.user) === null || _c === void 0 ? void 0 : _c._id).select("-password");
        const recipe = yield Recipe_1.default.find({ owner: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id }).populate("owner", "-password");
        user === null || user === void 0 ? void 0 : user.set({ recipes: recipe });
        // check user existince
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        // generate token
        const token = (0, generateToken_1.generateToken)(user === null || user === void 0 ? void 0 : user._id);
        // Remove password
        const _e = user.toObject(), { password: _ } = _e, result = __rest(_e, ["password"]);
        // send response
        res.status(200).json(Object.assign(Object.assign({ success: true, message: "Your profile" }, result), { token }));
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
});
exports.getProfile = getProfile;
// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, answer, newPassword } = req.body;
    try {
        const existingUser = yield User_1.default.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ msg: "Email does not exist" });
        }
        // Check if email is provided
        if (!email) {
            return res.status(400).json({ msg: "Please provide an email" });
        }
        // Check if answer is provided
        if (!answer) {
            return res.status(400).json({ msg: "Please provide an answer" });
        }
        // Check if newPassword is provided
        if (existingUser.answer !== answer) {
            return res.status(400).json({ msg: "Answer is incorrect" });
        }
        // Check if newPassword is empty
        if (!newPassword) {
            return res.status(400).json({ msg: "Please provide a new password" });
        }
        // generate salt to hash password
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(newPassword, salt);
        // Update user password
        const user = yield User_1.default.findByIdAndUpdate(existingUser._id, {
            password: hashedPassword,
        });
        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
});
exports.forgotPassword = forgotPassword;
// @desc    Update user profile
// @route   PUT /api/v1/auth/update
// @access  Private
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        // Check if user exists
        const user = yield User_1.default.findById((_f = req.user) === null || _f === void 0 ? void 0 : _f._id); // req.user?._id is set by the auth middleware
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const updatedUser = yield User_1.default.findByIdAndUpdate((_g = req.user) === null || _g === void 0 ? void 0 : _g._id, Object.assign({}, req.body), { new: true });
        // Create token
        const token = (0, generateToken_1.generateToken)(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
            token,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
});
exports.updateProfile = updateProfile;
// @desc    Delete user
// @route   DELETE /api/v1/auth/user/:id
// @access  Private/Admin or User
const deleteUserByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    try {
        const user = yield User_1.default.findById((_h = req.user) === null || _h === void 0 ? void 0 : _h._id);
        // Check if user exists with the given id
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        // Check if user is authorized to delete the user
        if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== ((_j = req.user) === null || _j === void 0 ? void 0 : _j._id.toString())) {
            return res.status(401).json({ msg: "Not authorized" });
        }
        // Delete user
        yield user.deleteOne();
        res.status(200).json({
            success: true,
            message: "Sad to see you go, user deleted successfully",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
});
exports.deleteUserByUser = deleteUserByUser;
// @desc    Delete user
// @route   DELETE /api/v1/auth/user/:id
// @access  Private/Admin
const deleteUserByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    try {
        const user = yield User_1.default.findById(req.params.id);
        // Check if user exists with the given id
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        // Check if user is authorized to delete the user
        if ((user === null || user === void 0 ? void 0 : user._id.toString()) !== ((_k = req.user) === null || _k === void 0 ? void 0 : _k._id.toString()) &&
            user.role === "admin") {
            return res.status(401).json({ msg: "Not authorized" });
        }
        // Delete user
        yield user.deleteOne();
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
});
exports.deleteUserByAdmin = deleteUserByAdmin;
// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find({}).select("-password");
        res.status(200).json({
            success: true,
            message: "All users",
            users,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
});
exports.getUsers = getUsers;
// @desc    Get a user's profile
// @route   GET /api/v1/auth/user/:id
// @access  Public
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        // Get user's recipes
        const recipes = yield Recipe_1.default.find({ owner: req.params.id });
        res.status(200).json({ user, recipes });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ msg: "Server error", error: error.message });
        }
    }
});
exports.getUserProfile = getUserProfile;
