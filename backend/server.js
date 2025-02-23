import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'


// config
const app = express()
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary()

// Midleware
app.use(express.json());
app.use(cors())

// api endpoint

app.use('/api/admin', adminRouter)
// localhost:4000/api/admin

app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) =>{
    res.send("API Working");
})

app.listen(port, ()=> console.log("Server is Running", port))