import { Router } from "express";
import register from './auth.js'

const router = Router();
router.get("/", (req, res, next) => {
 try {
  return res.render(
   "./inside/index",
   {
    name: 'Data from object',
    last_name: 'Jackson',
    nombres: [
     {
      name: 'Data from object',
      photo: "https://plus.unsplash.com/premium_photo-1664701475272-953393050754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
     },
     {
      name: 'Data from object',
      photo: "https://plus.unsplash.com/premium_photo-1664701475272-953393050754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
     },
     {
      name: 'Data from object',
      photo: "https://plus.unsplash.com/premium_photo-1664701475272-953393050754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
     },
    ],
    script: '/public/connection.js'
   })
 } catch (error) {
  next(error);
 }
});

router.use('/register', register)

export default router;
