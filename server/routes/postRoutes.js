import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "../mongodb/connect.js";
import Post from "../mongodb/models/post.js";
dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ data: posts, success: true });
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
});

router.post("/", async (req, res) => {
  const { name, prompt, photo } = req.body;
  const photoUrl = await cloudinary.uploader.upload(photo);
  try {
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    res.status(201).json({ data: newPost, success: true });
  } catch (error) {
    res.status(409).json({ message: error.message, success: false });
  }
});
export default router;