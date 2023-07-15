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
exports.unlikeRecipe = exports.likeRecipe = exports.deleteReview = exports.addReview = exports.getRecipesByUser = exports.getSavedRecipes = exports.unsaveRecipe = exports.saveRecipe = exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = exports.getRecipeById = exports.getRecipes = void 0;
const User_1 = __importDefault(require("../models/User"));
const Recipe_1 = __importDefault(require("../models/Recipe"));
const Category_1 = __importDefault(require("../models/Category"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
// @desc    GET all recipes
// @route   GET /api/v1/recipes
// @access  Public
const getRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield Recipe_1.default.find({})
            .populate("owner", "name avatar")
            .populate("category", "name image");
        res.status(200).json(recipes);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getRecipes = getRecipes;
//@desc     GET a recipe by id
//@route    GET /api/v1/recipes/:id
//@access   Public
const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recipeId } = req.params;
        const recipe = yield Recipe_1.default.findById(recipeId)
            .populate("owner", "-password")
            .populate("category", "name image");
        const views = (recipe === null || recipe === void 0 ? void 0 : recipe.views) || 0;
        recipe === null || recipe === void 0 ? void 0 : recipe.set({ views: views + 1 });
        yield (recipe === null || recipe === void 0 ? void 0 : recipe.save());
        if (!recipe) {
            res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getRecipeById = getRecipeById;
//@desc     Create a recipe
//@route    POST /api/v1/recipes
//@access   Private
const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!(req === null || req === void 0 ? void 0 : req.user)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const newRecipe = yield Recipe_1.default.create(Object.assign(Object.assign({}, req.body), { owner: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id }));
        yield Category_1.default.findByIdAndUpdate(req.body.category, {
            $push: { recipes: newRecipe._id },
        });
        res.status(201).json(newRecipe);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.createRecipe = createRecipe;
//@desc     Update a recipe
//@route    PUT /api/v1/recipes/:id
//@access   Private
const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { recipeId } = req.params;
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const recipe = yield Recipe_1.default.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Check if the user is the owner of the recipe
        if ((recipe === null || recipe === void 0 ? void 0 : recipe.owner.toString()) !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const updatedRecipe = yield Recipe_1.default.findByIdAndUpdate(recipeId, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: "Recipe updated successfully",
            updatedRecipe,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.updateRecipe = updateRecipe;
//@desc     Delete a recipe
//@route    DELETE /api/v1/recipes/:id
//@access   Private
const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { recipeId } = req.params;
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const recipe = yield Recipe_1.default.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Check if the user is the owner of the recipe
        if ((recipe === null || recipe === void 0 ? void 0 : recipe.owner.toString()) !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c._id.toString())) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        yield Recipe_1.default.findByIdAndDelete(recipeId);
        res.status(200).json({
            success: true,
            message: "Recipe deleted successfully",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteRecipe = deleteRecipe;
// @desc    Save a recipe
// @route   PUT /api/v1/recipes/:id/save
// @access  Private
const saveRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const recipe = yield Recipe_1.default.findById(req.body.recipeID).populate("category", "name image recipes");
        const user = yield User_1.default.findById(req.body.userID);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Check if the user is the owner of the recipe
        // if (recipe.owner.toString() === req?.user?._id.toString()) {
        //   res.status(401);
        //   throw new Error("You cannot save your own recipe");
        // }
        // Check if the recipe is already saved
        const isSaved = user === null || user === void 0 ? void 0 : user.savedRecipes.includes(recipe._id);
        if (isSaved) {
            return res.status(400).json({ message: "Recipe already saved" });
        }
        // Save the recipe
        yield User_1.default.findByIdAndUpdate(req.body.userID, {
            $push: { savedRecipes: recipe._id },
        }, { new: true } // to return the updated document
        );
        // user?.savedRecipes.push(recipe._id);
        // await user?.save();
        res.status(200).json({
            success: true,
            message: "Recipe saved successfully",
            savedRecipes: user === null || user === void 0 ? void 0 : user.savedRecipes,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.saveRecipe = saveRecipe;
// @desc    Unsave a recipe
// @route   PUT /api/v1/recipes/:id/unsave
// @access  Private
const unsaveRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const recipe = yield Recipe_1.default.findById(req.body.recipeID).populate("category", "name");
        const user = yield User_1.default.findById(req.body.userID);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Check if the recipe is already saved
        const isUnsaved = user === null || user === void 0 ? void 0 : user.savedRecipes.includes(recipe._id);
        if (!isUnsaved) {
            return res.status(400).json({ message: "Recipe not saved" });
        }
        // Unsave the recipe
        yield User_1.default.findByIdAndUpdate(req.body.userID, {
            $pull: { savedRecipes: recipe._id },
        }, { new: true } // to return the updated document
        );
        res.status(200).json({
            success: true,
            message: "Recipe unsaved successfully",
            savedRecipes: user === null || user === void 0 ? void 0 : user.savedRecipes,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.unsaveRecipe = unsaveRecipe;
// @desc    Get recipes by user
// @route   GET /api/v1/recipes/savedRecipes/:userId
// @access  Public
const getRecipesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // user id
        const user = yield User_1.default.findById(id)
            .populate("savedRecipes")
            .select("-password");
        res.status(201).json(user === null || user === void 0 ? void 0 : user.savedRecipes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getRecipesByUser = getRecipesByUser;
// @desc    Get saved recipes
// @route   GET /api/v1/recipes/savedRecipes/ids/:id
// @access  Private
const getSavedRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params; // user id
        const user = yield User_1.default.findById(id)
            .populate("savedRecipes")
            .select("-password");
        const savedRecipes = yield Recipe_1.default.find({
            _id: { $in: user === null || user === void 0 ? void 0 : user.savedRecipes }, // find recipes with ids in the savedRecipes array
        })
            .populate("category", "name image")
            .populate("owner", "name");
        res.status(200).json({
            // savedRecipes: user?.savedRecipes,
            savedRecipes,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.getSavedRecipes = getSavedRecipes;
// @desc    Create a review
// @route   POST /api/v1/recipes/:id/reviews
// @access  Private
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g;
    try {
        const { id } = req.params; // recipe id
        // we need to get the rating and comment because we are going to send a number rating and a comment
        const { rating, comment } = req.body;
        const recipe = yield Recipe_1.default.findById(id)
            .sort({ createdAt: -1 })
            .populate({
            path: "reviews",
            populate: {
                path: "user",
                select: "name email",
            },
        });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // Check if the user already reviewed the recipe before, so we match the review user with the logged in user
        const alreadyReviewed = recipe.reviews.find((review) => { var _a, _b; return ((_a = review === null || review === void 0 ? void 0 : review.user) === null || _a === void 0 ? void 0 : _a.toString()) === ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString()); });
        // if (alreadyReviewed) {
        //   return res.status(400).json({ message: "Recipe already reviewed" });
        // }
        // if the user has not reviewed the recipe before, we create a new review object
        const review = {
            name: (_d = req.user) === null || _d === void 0 ? void 0 : _d.name,
            rating: Number(rating),
            comment: comment,
            user: (_e = req.user) === null || _e === void 0 ? void 0 : _e._id,
        };
        // we push the new review to the recipe reviews array
        recipe.reviews.push(review);
        // we update the number of reviews and the rating
        recipe.numReviews = recipe.reviews.length;
        // we update/calculate the rating the rating by getting the sum of all the ratings and dividing it by the number of reviews
        recipe.rating =
            ((_f = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _f === void 0 ? void 0 : _f.reduce((acc, item) => Number(item === null || item === void 0 ? void 0 : item.rating) + acc, 0)) /
                ((_g = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _g === void 0 ? void 0 : _g.length);
        // we save the recipe
        yield recipe.save();
        res.status(201).json({ recipe, message: "Review added" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.addReview = addReview;
// @desc    Delete a review
// @route   DELETE /api/v1/recipes/reviews/:recipeId/:reviewId
// @access  Private
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    try {
        const { recipeId, reviewId } = req.params; // recipe id and review id
        const recipe = yield Recipe_1.default.findByIdAndUpdate(recipeId, {
            $pull: { reviews: { _id: reviewId } },
        }, { new: true });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        // we update the number of reviews and the rating
        recipe.numReviews = recipe.reviews.length;
        // we update/calculate the rating the rating by getting the sum of all the ratings and dividing it by the number of reviews
        recipe.rating =
            ((_h = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _h === void 0 ? void 0 : _h.reduce((acc, item) => Number(item === null || item === void 0 ? void 0 : item.rating) + acc, 0)) /
                ((_j = recipe === null || recipe === void 0 ? void 0 : recipe.reviews) === null || _j === void 0 ? void 0 : _j.length);
        // we save the recipe
        yield recipe.save();
        res.status(200).json({ recipe, message: "Review deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.deleteReview = deleteReview;
// @desc    Like a recipe
// @route   PUT /api/v1/recipes/like
// @access  Private
const likeRecipe = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const recipe = yield Recipe_1.default.findByIdAndUpdate(req.body.recipeID, {
        $push: { likes: (_k = req.user) === null || _k === void 0 ? void 0 : _k._id },
    }, { new: true });
    if (!recipe) {
        res.status(404);
        throw new Error("Recipe not found");
    }
    res.status(200).json({
        message: "Recipe liked successfully",
        likes: recipe === null || recipe === void 0 ? void 0 : recipe.likes,
    });
}));
exports.likeRecipe = likeRecipe;
// @desc    Unlike a recipe
// @route   PUT /api/v1/recipes/unlike
// @access  Private
const unlikeRecipe = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    const recipe = yield Recipe_1.default.findByIdAndUpdate(req.body.recipeID, {
        $pull: { likes: (_l = req.user) === null || _l === void 0 ? void 0 : _l._id },
    }, { new: true });
    res.status(200).json({
        message: "Recipe unliked successfully",
        likes: recipe === null || recipe === void 0 ? void 0 : recipe.likes,
    });
}));
exports.unlikeRecipe = unlikeRecipe;
