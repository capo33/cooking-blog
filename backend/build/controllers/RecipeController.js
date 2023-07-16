"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.unlikeRecipe = exports.likeRecipe = exports.deleteReview = exports.addReview = exports.getRecipesByUser = exports.getSavedRecipes = exports.unsaveRecipe = exports.saveRecipe = exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = exports.getRecipeById = exports.getRecipes = void 0;
var User_1 = __importDefault(require("../models/User"));
var Recipe_1 = __importDefault(require("../models/Recipe"));
var Category_1 = __importDefault(require("../models/Category"));
var asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
// @desc    GET all recipes
// @route   GET /api/v1/recipes
// @access  Public
var getRecipes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipes, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Recipe_1.default.find({})
                        .populate("owner", "name image")
                        .populate("category", "name image")];
            case 1:
                recipes = _a.sent();
                res.status(200).json(recipes);
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
exports.getRecipes = getRecipes;
//@desc     GET a recipe by id
//@route    GET /api/v1/recipes/:id
//@access   Public
var getRecipeById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeId, recipe, views, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                recipeId = req.params.recipeId;
                return [4 /*yield*/, Recipe_1.default.findById(recipeId)
                        .populate("owner", "-password")
                        .populate("category", "name image")];
            case 1:
                recipe = _a.sent();
                views = (recipe === null || recipe === void 0 ? void 0 : recipe.views) || 0;
                recipe === null || recipe === void 0 ? void 0 : recipe.set({ views: views + 1 });
                return [4 /*yield*/, (recipe === null || recipe === void 0 ? void 0 : recipe.save())];
            case 2:
                _a.sent();
                if (!recipe) {
                    return [2 /*return*/, res.status(404).json({ message: "Recipe not found" })];
                }
                res.status(200).json(recipe);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                if (error_2 instanceof Error) {
                    res.status(500).json({ message: error_2.message });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getRecipeById = getRecipeById;
//@desc     Create a recipe
//@route    POST /api/v1/recipes
//@access   Private
var createRecipe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newRecipe, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                if (!(req === null || req === void 0 ? void 0 : req.user)) {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                return [4 /*yield*/, Recipe_1.default.create(__assign(__assign({}, req.body), { owner: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id }))];
            case 1:
                newRecipe = _b.sent();
                // Add the recipe to the category
                return [4 /*yield*/, Category_1.default.findByIdAndUpdate(req.body.category, {
                        $push: { recipes: newRecipe._id },
                    })];
            case 2:
                // Add the recipe to the category
                _b.sent();
                res.status(201).json({
                    success: true,
                    message: "Recipe created successfully",
                    newRecipe: newRecipe,
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                if (error_3 instanceof Error) {
                    res.status(500).json({ message: error_3.message });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createRecipe = createRecipe;
//@desc     Update a recipe
//@route    PUT /api/v1/recipes/:id
//@access   Private
var updateRecipe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeId, recipe, updatedRecipe, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                recipeId = req.params.recipeId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                if (!req.user) {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                return [4 /*yield*/, Recipe_1.default.findById(recipeId)];
            case 2:
                recipe = _b.sent();
                if (!recipe) {
                    return [2 /*return*/, res.status(404).json({ message: "Recipe not found" })];
                }
                // Check if the user is the owner of the recipe
                if ((recipe === null || recipe === void 0 ? void 0 : recipe.owner.toString()) !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                return [4 /*yield*/, Recipe_1.default.findByIdAndUpdate(recipeId, req.body, { new: true })];
            case 3:
                updatedRecipe = _b.sent();
                res.status(200).json({
                    success: true,
                    message: "Recipe updated successfully",
                    updatedRecipe: updatedRecipe,
                });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _b.sent();
                if (error_4 instanceof Error) {
                    res.status(500).json({ message: error_4.message });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateRecipe = updateRecipe;
//@desc     Delete a recipe
//@route    DELETE /api/v1/recipes/:id
//@access   Private
var deleteRecipe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipeId, recipe, error_5;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                recipeId = req.params.recipeId;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                // Check if the user is logged in
                if (!req.user) {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                return [4 /*yield*/, Recipe_1.default.findById(recipeId)];
            case 2:
                recipe = _b.sent();
                if (!recipe) {
                    return [2 /*return*/, res.status(404).json({ message: "Recipe not found" })];
                }
                // Check if the user is the owner of the recipe
                if ((recipe === null || recipe === void 0 ? void 0 : recipe.owner.toString()) !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                return [4 /*yield*/, Recipe_1.default.findByIdAndDelete(recipeId)];
            case 3:
                _b.sent();
                res.status(200).json({
                    success: true,
                    message: "Recipe deleted successfully",
                });
                return [3 /*break*/, 5];
            case 4:
                error_5 = _b.sent();
                if (error_5 instanceof Error) {
                    res.status(500).json({ message: error_5.message });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteRecipe = deleteRecipe;
// @desc    Save a recipe
// @route   PUT /api/v1/recipes/:id/save
// @access  Private
var saveRecipe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipe, user, isSaved, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                return [4 /*yield*/, Recipe_1.default.findById(req.body.recipeID).populate("category", "name image recipes")];
            case 1:
                recipe = _a.sent();
                return [4 /*yield*/, User_1.default.findById(req.body.userID)];
            case 2:
                user = _a.sent();
                if (!recipe) {
                    return [2 /*return*/, res.status(404).json({ message: "Recipe not found" })];
                }
                isSaved = user === null || user === void 0 ? void 0 : user.savedRecipes.includes(recipe._id);
                if (isSaved) {
                    return [2 /*return*/, res.status(400).json({ message: "Recipe already saved" })];
                }
                // Save the recipe
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(req.body.userID, {
                        $push: { savedRecipes: recipe._id },
                    }, { new: true } // to return the updated document
                    )];
            case 3:
                // Save the recipe
                _a.sent();
                res.status(200).json({
                    success: true,
                    message: "Recipe saved successfully",
                    savedRecipes: user === null || user === void 0 ? void 0 : user.savedRecipes,
                });
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                if (error_6 instanceof Error) {
                    res.status(500).json({ message: error_6.message });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.saveRecipe = saveRecipe;
// @desc    Unsave a recipe
// @route   PUT /api/v1/recipes/:id/unsave
// @access  Private
var unsaveRecipe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipe, user, isUnsaved, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.user) {
                    return [2 /*return*/, res.status(401).json({ message: "Unauthorized" })];
                }
                return [4 /*yield*/, Recipe_1.default.findById(req.body.recipeID).populate("category", "name image recipes")];
            case 1:
                recipe = _a.sent();
                return [4 /*yield*/, User_1.default.findById(req.body.userID)];
            case 2:
                user = _a.sent();
                if (!recipe) {
                    return [2 /*return*/, res.status(404).json({ message: "Recipe not found" })];
                }
                isUnsaved = user === null || user === void 0 ? void 0 : user.savedRecipes.includes(recipe._id);
                if (!isUnsaved) {
                    return [2 /*return*/, res.status(400).json({ message: "Recipe not saved" })];
                }
                // Unsave the recipe
                return [4 /*yield*/, User_1.default.findByIdAndUpdate(req.body.userID, {
                        $pull: { savedRecipes: recipe._id },
                    }, { new: true } // to return the updated document
                    )];
            case 3:
                // Unsave the recipe
                _a.sent();
                res.status(200).json({
                    success: true,
                    message: "Recipe unsaved successfully",
                    savedRecipes: user === null || user === void 0 ? void 0 : user.savedRecipes,
                });
                return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                if (error_7 instanceof Error) {
                    res.status(500).json({ message: error_7.message });
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.unsaveRecipe = unsaveRecipe;
// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/:userId
// @access  Public
var getRecipesByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, User_1.default.findById(id)
                        .populate("savedRecipes")
                        .select("-password")];
            case 1:
                user = _a.sent();
                res.status(201).json(user === null || user === void 0 ? void 0 : user.savedRecipes);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(500).json({ message: error_8.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRecipesByUser = getRecipesByUser;
// @desc    Get saved recipes
// @route   GET /api/v1/recipes/savedRecipes/ids/:id
// @access  Private
var getSavedRecipes = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, user, savedRecipes, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, User_1.default.findById(id)
                        .populate("savedRecipes")
                        .select("-password")];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, Recipe_1.default.find({
                        _id: { $in: user === null || user === void 0 ? void 0 : user.savedRecipes }, // find recipes with ids in the savedRecipes array
                    })
                        .populate("category", "name image")
                        .populate("owner", "name")];
            case 2:
                savedRecipes = _a.sent();
                res.status(200).json({ savedRecipes: savedRecipes });
                return [3 /*break*/, 4];
            case 3:
                error_9 = _a.sent();
                if (error_9 instanceof Error) {
                    res.status(500).json({ message: error_9.message });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSavedRecipes = getSavedRecipes;
// @desc    Create a review
// @route   POST /api/v1/recipes/:id/reviews
// @access  Private
var addReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, rating, comment, recipe, alreadyReviewed, review, error_10;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 3, , 4]);
                id = req.params.id;
                _a = req.body, rating = _a.rating, comment = _a.comment;
                return [4 /*yield*/, Recipe_1.default.findById(id)
                        // .sort({ createdAt: -1 })
                        .populate({
                        path: "reviews",
                        populate: {
                            path: "user",
                            select: "name email",
                        },
                    })];
            case 1:
                recipe = _f.sent();
                if (!recipe) {
                    return [2 /*return*/, res.status(404).json({ message: "Recipe not found" })];
                }
                alreadyReviewed = recipe.reviews.find(function (review) { var _a, _b; return ((_a = review === null || review === void 0 ? void 0 : review.user) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString()); });
                if (alreadyReviewed) {
                    return [2 /*return*/, res.status(400).json({ message: "Recipe already reviewed" })];
                }
                review = {
                    name: (_b = req.user) === null || _b === void 0 ? void 0 : _b.name,
                    rating: Number(rating),
                    comment: comment,
                    user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id,
                };
                // we push the new review to the recipe reviews array
                recipe.reviews.push(review);
                // we update the number of reviews and the rating
                recipe.numReviews = recipe.reviews.length;
                // we update/calculate the rating the rating by getting the sum of all the ratings and dividing it by the number of reviews
                recipe.rating =
                    ((_d = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _d === void 0 ? void 0 : _d.reduce(function (acc, item) { return Number(item === null || item === void 0 ? void 0 : item.rating) + acc; }, 0)) /
                        ((_e = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _e === void 0 ? void 0 : _e.length);
                // we save the recipe
                return [4 /*yield*/, recipe.save()];
            case 2:
                // we save the recipe
                _f.sent();
                res.status(201).json({ recipe: recipe, message: "Review added" });
                return [3 /*break*/, 4];
            case 3:
                error_10 = _f.sent();
                if (error_10 instanceof Error) {
                    res.status(500).json({ message: error_10.message });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.addReview = addReview;
// @desc    Delete a review
// @route   DELETE /api/v1/recipes/reviews/:recipeId/:reviewId
// @access  Private
var deleteReview = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, recipeId, reviewId, recipe, error_11;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 3, , 4]);
                _a = req.params, recipeId = _a.recipeId, reviewId = _a.reviewId;
                return [4 /*yield*/, Recipe_1.default.findByIdAndUpdate(recipeId, {
                        $pull: { reviews: { _id: reviewId } },
                    }, { new: true })];
            case 1:
                recipe = _d.sent();
                if (!recipe) {
                    return [2 /*return*/, res.status(404).json({ message: "Recipe not found" })];
                }
                // we update the number of reviews and the rating
                recipe.numReviews = recipe.reviews.length;
                // we update/calculate the rating the rating by getting the sum of all the ratings and dividing it by the number of reviews
                recipe.rating =
                    ((_b = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _b === void 0 ? void 0 : _b.reduce(function (acc, item) { return Number(item === null || item === void 0 ? void 0 : item.rating) + acc; }, 0)) /
                        ((_c = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _c === void 0 ? void 0 : _c.length);
                // we save the recipe
                return [4 /*yield*/, recipe.save()];
            case 2:
                // we save the recipe
                _d.sent();
                res.status(200).json({ recipe: recipe, message: "Review deleted" });
                return [3 /*break*/, 4];
            case 3:
                error_11 = _d.sent();
                if (error_11 instanceof Error) {
                    res.status(500).json({ message: error_11.message });
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteReview = deleteReview;
// @desc    Like a recipe
// @route   PUT /api/v1/recipes/like
// @access  Private
var likeRecipe = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipe;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Recipe_1.default.findByIdAndUpdate(req.body.recipeID, {
                    $push: { likes: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id },
                }, { new: true })];
            case 1:
                recipe = _b.sent();
                if (!recipe) {
                    res.status(404);
                    throw new Error("Recipe not found");
                }
                res.status(200).json({
                    message: "Recipe liked successfully",
                    likes: recipe === null || recipe === void 0 ? void 0 : recipe.likes,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.likeRecipe = likeRecipe;
// @desc    Unlike a recipe
// @route   PUT /api/v1/recipes/unlike
// @access  Private
var unlikeRecipe = (0, asyncHandler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var recipe;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Recipe_1.default.findByIdAndUpdate(req.body.recipeID, {
                    $pull: { likes: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id },
                }, { new: true })];
            case 1:
                recipe = _b.sent();
                res.status(200).json({
                    message: "Recipe unliked successfully",
                    likes: recipe === null || recipe === void 0 ? void 0 : recipe.likes,
                });
                return [2 /*return*/];
        }
    });
}); });
exports.unlikeRecipe = unlikeRecipe;
