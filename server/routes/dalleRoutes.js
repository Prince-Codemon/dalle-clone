import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
dotenv.config();
const router = express.Router();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hello World from dalle");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;

    return res.status(200).json({ photo: image });
  } catch (error) {
    return res
      .status(500)
      .send(error?.response.data.error.message || error.message);
  }
});

export default router;
