const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("Connection Successful");
      })
      .catch((e) => {
        console.log(e); 
      });
  } catch (error) {
    console.log(error);
  } 
};

module.exports = connectDB;
