const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./mongodb/connect");
// const dalleRoutes = require('./routes/dalleRoutes')
const postRoutes = require("./routes/postRoutes");
const app = express();
connectDB();
const PORT = process.env.PORT || 3000;
const { OpenAIApi, Configuration } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const auth = (req, res, next) => {
  if (req.headers.secretkey === process.env.SECRET_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/posts", auth, postRoutes);
// app.('/api/v1/dalle',auth,dalleRoutes)
app.post("/api/v1/dalle", auth, async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;
    return res.status(200).json({ prompt });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Listening on => http://localhost:`, PORT));
