"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
// Load env vars
dotenv_1.default.config();
const db_1 = require("./config/db");
const Auth_routes_1 = __importDefault(require("./routes/Auth.routes"));
const Recipe_routes_1 = __importDefault(require("./routes/Recipe.routes"));
const Category_routes_1 = __importDefault(require("./routes/Category.routes"));
const Upload_routes_1 = __importDefault(require("./routes/Upload.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
// Initialize express
const app = (0, express_1.default)();
// Set port
const PORT = parseInt(process.env.PORT, 10) || 5000;
// Connect to MongoDB
(0, db_1.connectDB)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({
        message: "API is running...",
    });
});
// Routes
app.use("/api/v1/auth", Auth_routes_1.default);
app.use("/api/v1/recipes", Recipe_routes_1.default);
app.use("/api/v1/categories", Category_routes_1.default);
app.use("/api/v1/upload", Upload_routes_1.default);
const directoryname = path_1.default.resolve();
app.use("/uploads", express_1.default.static(path_1.default.join(directoryname, "/uploads")));
// Make uploads folder static
// const directoryname: string = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use("/uploads", express_1.default.static("/var/data/uploads"));
    app.use(express_1.default.static(path_1.default.join(directoryname, "/frontend/build")));
    // for any route that is not api, redirect to index.html
    app.get("*", (req, res) => res.sendFile(path_1.default.resolve(directoryname, "frontend", "build", "index.html")));
}
else {
    // Welcome route
    app.get("/", (req, res) => {
        res.json({
            message: "API is running...",
        });
    });
}
// Error handler middleware
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
// Start server
try {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} 🚀`);
    });
}
catch (error) {
    if (error instanceof Error) {
        console.log(`Error occured: (${error.name}: ${error.message})`);
    }
}
