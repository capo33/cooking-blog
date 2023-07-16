"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
// Load env vars
dotenv_1.default.config();
var db_1 = require("./config/db");
var Auth_routes_1 = __importDefault(require("./routes/Auth.routes"));
var Recipe_routes_1 = __importDefault(require("./routes/Recipe.routes"));
var Category_routes_1 = __importDefault(require("./routes/Category.routes"));
var Upload_routes_1 = __importDefault(require("./routes/Upload.routes"));
var errorHandler_1 = require("./middlewares/errorHandler");
// Initialize express
var app = (0, express_1.default)();
// Set port
var PORT = parseInt(process.env.PORT, 10) || 5000;
// Connect to MongoDB
(0, db_1.connectDB)();
// Middleware
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({
    extended: true,
    limit: "10mb",
    parameterLimit: 100000, //
}));
// Routes
app.use("/api/v1/auth", Auth_routes_1.default);
app.use("/api/v1/recipes", Recipe_routes_1.default);
app.use("/api/v1/categories", Category_routes_1.default);
app.use("/api/v1/upload", Upload_routes_1.default);
// const __dirname: string = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// Make uploads folder static
if (process.env.NODE_ENV === "production") {
    // const __dirname: string = path.resolve();
    // var/data/uploads is the folder where Render stores uploaded files in production mode, so we need to make it static so that we can access the files from the frontend
    // app.use("/uploads", express.static("/var/data/uploads"));
    app.use(express_1.default.static(path_1.default.join(__dirname, "/frontend/build")));
    // for any route that is not api, redirect to index.html
    app.get("*", function (req, res) {
        return res.sendFile(path_1.default.resolve(__dirname, "frontend", "build", "index.html"));
    });
}
else {
    // Welcome route
    app.get("/", function (req, res) {
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
    app.listen(PORT, function () {
        console.log("Server is running on port ".concat(PORT, " \uD83D\uDE80"));
    });
}
catch (error) {
    if (error instanceof Error) {
        console.log("Error occured: (".concat(error.name, ": ").concat(error.message, ")"));
    }
}
