"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: [true, "Please enter your rating"],
        default: 0,
    },
    comment: {
        type: String,
        required: [true, "Please enter your comment"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Review", reviewSchema);
