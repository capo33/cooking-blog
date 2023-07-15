"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Review_1 = __importDefault(require("./Review"));
const recipeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: [true, "Please enter your instructions"],
    },
    ingredients: {
        type: [String],
        required: [true, "Please enter your ingredients"],
    },
    image: {
        type: String,
    },
    cookingTime: {
        type: Number,
        required: [true, "Please enter your cooking time"],
        default: 0,
    },
    views: {
        type: Number,
        required: [true, "Please enter your views"],
        default: 0,
    },
    reviews: [Review_1.default.schema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    likes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Recipe", recipeSchema);
