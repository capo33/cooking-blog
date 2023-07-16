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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
var slugify_1 = __importDefault(require("slugify"));
var Category_1 = __importDefault(require("../models/Category"));
// @desc    Get all categories
// @route   GET /api/v1/categories
// @access  Public
var getCategories = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var categories, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Category_1.default.find({}).populate("recipes")];
            case 1:
                categories = _a.sent();
                res.status(200).json(categories);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                if (error_1 instanceof Error) {
                    res.status(500).json({ message: error_1.message });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCategories = getCategories;
// @desc    Get a category by slug
// @route   GET /api/v1/categories/:slug
// @access  Public
var getCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var slug, category, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                slug = req.params.slug;
                return [4 /*yield*/, Category_1.default.findOne({ slug: slug }).populate({
                        path: "recipes",
                        populate: {
                            path: "owner",
                            select: "name image",
                        },
                    })];
            case 1:
                category = _a.sent();
                if (!category) {
                    return [2 /*return*/, res.status(404).json({ message: "Category not found" })];
                }
                res.status(200).json(category);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    res.status(500).json({ message: error_2.message });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCategory = getCategory;
// @desc    Create a category
// @route   POST /api/v1/categories
// @access  Private/Admin
var createCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, image, category, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, image = _a.image;
                return [4 /*yield*/, Category_1.default.create({
                        name: name_1,
                        slug: (0, slugify_1.default)(name_1),
                        image: image,
                    })];
            case 1:
                category = _b.sent();
                res.status(201).json({
                    success: true,
                    message: "Category created successfully",
                    category: category,
                });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                if (error_3 instanceof Error) {
                    res.status(500).json({ message: error_3 });
                }
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createCategory = createCategory;
// @desc    Update a category
// @route   PUT /api/v1/categories/:id
// @access  Private/Admin
var updateCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, category, updatedCategory, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Category_1.default.findById(id)];
            case 1:
                category = _a.sent();
                if (!category) {
                    return [2 /*return*/, res.status(404).json({ message: "Category not found" })];
                }
                return [4 /*yield*/, Category_1.default.findByIdAndUpdate(id, req.body, { new: true })];
            case 2:
                updatedCategory = _a.sent();
                res.status(200).json({
                    success: true,
                    message: "Category updated successfully",
                    updatedCategory: updatedCategory,
                });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                if (error_4 instanceof Error) {
                    res.status(500).json({ message: error_4.message });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateCategory = updateCategory;
// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
var deleteCategory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, category, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Category_1.default.findById(id)];
            case 1:
                category = _a.sent();
                if (!category) {
                    return [2 /*return*/, res.status(404).json({ message: "Category not found" })];
                }
                return [4 /*yield*/, category.deleteOne()];
            case 2:
                _a.sent();
                res.status(200).json({
                    success: true,
                    message: "Category deleted successfully",
                });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                if (error_5 instanceof Error) {
                    res.status(500).json({ message: error_5.message });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteCategory = deleteCategory;
