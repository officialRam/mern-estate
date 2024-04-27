import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import userSignup from './routes/auth.route.js'
dotenv.config();
const app=express();
// it allo input in json format
app.use(express.json());
mongoose
.connect(process.env.MONGO)
.then(()=>{
    console.log("Database is connected")
}).catch(()=>{
    console.log("Database is not connected") 
})

app.listen(3000, ()=>{
    console.log("Server is running on 3000!")
})
 app.use('/api/user', userRouter);
 app.use('/api/auth', userSignup);
//middleware to define an error more precisely
 app.use((err, req, res, next)=>{
    const statusCode=err.statusCode||500;
    const message=err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
 })