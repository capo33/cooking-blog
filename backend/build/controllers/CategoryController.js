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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const slugify_1 = __importDefault(require("slugify"));
const Category_1 = __importDefault(require("../models/Category"));
// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find({}).populate("recipes");
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getCategories = getCategories;
// @desc    Get a category by slug
// @route   GET /api/v1/categories/:slug
// @access  Public
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        // populate recipes with owner name and image
        const category = yield Category_1.default.findOne({ slug }).populate({
            path: "recipes",
            populate: {
                path: "owner",
                select: "name image",
            },
        });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getCategory = getCategory;
// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, image } = req.body;
        const category = yield Category_1.default.create({
            name,
            slug: (0, slugify_1.default)(name),
            image,
        });
        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category,
        });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.createCategory = createCategory;
// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield Category_1.default.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        const updatedCategory = yield Category_1.default.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: "Category updated successfully",
            updatedCategory,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateCategory = updateCategory;
// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
// @access  Private/Admin
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield Category_1.default.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        yield category.deleteOne();
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteCategory = deleteCategory;
