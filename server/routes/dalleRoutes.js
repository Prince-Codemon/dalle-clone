require("dotenv").config();
const { OpenAIApi, Configuration } = require("openai");
const router = require("express").Router();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  // try {
  //   const { prompt } = req.body;
  //   if(!prompt) return res.status(400).json({message: "Prompt is required"} )
  //   const response = await openai.createImage({
  //     prompt: prompt,
  //     n: 1,
  //     size: "512x512",
  //     response_format: "b64_json",
  //   });
  //   const image =  response?.data?.data[0].b64_json;
  //   return res.status(200).json({ photo: image });
  // } catch (error) {
  //   return res
  //     .status(500)
  //     .send(error?.response.data.error.message);
  // }

  router.post('/', async (req, res) => {
    try {
      const { prompt } = req.body;

      const aiResponse = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });

      const image = aiResponse.data.data[0].b64_json;
      res.status(200).json({ photo: image });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(error?.response.data.error.message || "Something went wrong");
    }
  });
    
});




module.exports = router;
