require("dotenv").config();
const { OpenAIApi, Configuration } = require("openai");
const router = require("express").Router();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
 try {
   const { prompt } = req.body;
   const aiResponse = await openai.createImage({
     prompt,
     n: 1,
     size: "1024x1024",
     response_format: "b64_json",
   });
   const image = aiResponse.data.data[0].b64_json;
   return res.status(200).json({ photo: image, success: true });
 } catch (error) {
   return res.status(500).json({ message: error.message, success: false });
 }
});

module.exports = router;
