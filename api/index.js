import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const app=express();

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