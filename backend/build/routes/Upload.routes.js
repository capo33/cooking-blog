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
var multer_1 = __importDefault(require("multer"));
var express = __importStar(require("express"));
var path = __importStar(require("path"));
var router = express.Router();
// If production, use Render server's data folder, else use local uploads folder
var uploadFolder = "uploads/";
// Set Storage Engine
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder);
    },
    // we describe how we want the filename to be formatted
    filename: function (req, file, cb) {
        //extname = extension name of the file (e.g. .jpg, .png, .pdf)
        cb(null, "".concat(file.fieldname, "-").concat(Date.now()).concat(path === null || path === void 0 ? void 0 : path.extname(file.originalname)));
    },
});
// Check File Type
var checkFileType = function (file, cb) {
    // Allowed extensions
    var filetypes = /jpe?g|png|webp/;
    var mimetypes = /image\/jpe?g|image\/png|image\/webp/;
    // Check extension
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    var mimetype = mimetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    else {
        // cb = callback
        cb(new Error("Images only!"));
    }
};
// Init Upload
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});
// @route POST /upload
// @desc Uploads file to DB
router.post("/", upload.single("image"), function (req, res) {
    var _a, _b;
    try {
        res.json({
            message: "Image Uploaded Successfully",
            image: "/".concat((_b = (_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path) === null || _b === void 0 ? void 0 : _b.replace(/\\/g, "/")),
            // image: `/${req?.file?.path}`,
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
