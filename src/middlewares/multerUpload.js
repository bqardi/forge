import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export function multerUpload(req, res, next) {
  upload.single("avatar")(req, res, (err) => {
    if (err) {
      console.error("Failed to upload media:", err);
      res.status(500).json({ message: "Internal server error" });
    } else {
      next();
    }
  });
}
