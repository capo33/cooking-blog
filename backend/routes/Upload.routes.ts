import { FileFilterCallback } from "multer";
import multer from "multer";
import * as express from "express";
import { Request } from "express";
import * as path from "path";

const router = express.Router();

// If production, use Render server's data folder, else use local uploads folder
const uploadFolder = "uploads/";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Set Storage Engine
const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    cb(null, uploadFolder);
  },

  // we describe how we want the filename to be formatted
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ): void => {
    //extname = extension name of the file (e.g. .jpg, .png, .pdf)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path?.extname(file.originalname)}`
    );
  },
});

// Check File Type
const checkFileType = (file: Express.Multer.File, cb: FileFilterCallback) => {
  // Allowed extensions
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  // Check extension

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    // cb = callback
    cb(new Error("Images only!"));
  }
};

// Init Upload
const upload = multer({
  storage,

  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    checkFileType(file, cb);
  },
});

// @route POST /upload
// @desc Uploads file to DB
router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Image Uploaded Successfully",
      image: `/${req?.file?.path?.replace(/\\/g, "/")}`,
      // image: `/${req?.file?.path}`,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof multer.MulterError) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }
});

export default router;
