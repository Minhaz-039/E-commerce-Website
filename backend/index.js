//packages
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


//Utilities
import connectDB from './config/db.js'



dotenv.config();
const port = process.env.PORT || 5000 ;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({encoded:true}))
app.use(cookieParser())

app.use('/api/users' , userRoutes);
app.listen(port, () => {
    console.log(`server running on the port ${port}`)
})

//THis is a check file