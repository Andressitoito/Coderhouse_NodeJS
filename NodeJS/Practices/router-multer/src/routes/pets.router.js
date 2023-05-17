import { Router } from "express";
import { uploader } from "../utils.js";

const router = Router();
const pets = [];

router.get("/", (req, res) => {
 res.send({
  pets,
 });
});

router.post("/", uploader.single('thumbnail'), (req, res) => {
 console.log(req.file)
 const filename = req.file.filename

 if (!filename) {
  return res.send({
   status: 422,
   success: false,
   message: 'No file updated'
  })
 }

 const pet = req.body;
 pets.push(pet);

 pet.thumbnail = "http://localhost:8080/images/" + filename
 res.send({
  status: 201,
  success: true,
  pets,
 });
});

export default router