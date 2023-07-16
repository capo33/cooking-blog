"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    recipes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Recipe",
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Category", categorySchema);
