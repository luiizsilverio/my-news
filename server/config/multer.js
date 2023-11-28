import multer from "multer";
import path from 'path';

const tmpFolder = "uploads/"

const diskStorage = multer.diskStorage({
  destination: tmpFolder,
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${path.extname(file.originalname)}`;
		cb(null, fileName);
  }
})

const upload = multer({ storage: diskStorage });

export default upload;
