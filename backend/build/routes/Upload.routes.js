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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express = __importStar(require("express"));
const path = __importStar(require("path"));
const router = express.Router();
// If production, use Render server's data folder, else use local uploads folder
const uploadFolder = process.env.NODE_ENV === "production" ? "/var/data/uploads/" : "uploads/";
// Set Storage Engine
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    // we describe how we want the filename to be formatted
    filename: (req, file, cb) => {
        //extname = extension name of the file (e.g. .jpg, .png, .pdf)
        cb(null, `${file.fieldname}-${Date.now()}${path === null || path === void 0 ? void 0 : path.extname(file.originalname)}`);
    },
});
// Check File Type
const checkFileType = (file, cb) => {
    // Allowed extensions
    const filetypes = /jpg|jpeg|png|gif|jfif/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        // cb = callback
        cb(new Error("Only jpg, jpeg, png files are allowed!"));
    }
};
// Init Upload
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});
// @route POST /upload
// @desc Uploads file to DB
router.post("/", upload.single("image"), (req, res) => {
    var _a;
    try {
        res.json({
            message: "Image Uploaded Successfully",
            image: `/${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path.replace(/\\/g, "/")}`,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof multer_1.default.MulterError) {
            res.status(500).json({ message: "Server Error", error: error.message });
        }
    }
});
exports.default = router;
