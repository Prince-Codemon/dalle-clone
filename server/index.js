import express from 'express'
import dotenv from 'dotenv'
import connectDB from './mongodb/connect.js'
import  postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import cors from 'cors'
const app = express()
dotenv.config()
connectDB()
const PORT = process.env.PORT || 3000 

const auth = (req,res,next)=>{
    if (req.headers.secretkey === process.env.SECRET_KEY) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
}


app.use(cors()) 
app.use(express.json({limit: '50mb'}))

app.use('/api/v1/posts',auth,postRoutes)
app.use('/api/v1/dalle',dalleRoutes)
 

app.get('/',(req,res)=>{
    res.send('Hello World') 
})

app.listen(PORT,()=>console.log(`Listening on => http://localhost:`,PORT))