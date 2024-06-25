import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

export const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

console.log(imageFilter,storage);

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

export default uploadFile;
