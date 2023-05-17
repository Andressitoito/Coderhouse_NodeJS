import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";

const _filename = fileURLToPath(import.meta.url);
const __dirname = dirname(_filename);
export default __dirname;

const storage = multer.diskStorage({
 destination: function (req, file, cb) {
  cb(null, __dirname + "/public/images");
 },
 filename: function (req, file, cb) {
  cb(null, `${Date.now}-${file.originalname}`);
 },
});

export const uploader = multer({
 storage, onError: function (error, next) {
  console.log(error)
  next()
 }
})
