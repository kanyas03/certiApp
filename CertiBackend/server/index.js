import express,{json}  from 'express';
import dotenv from 'dotenv';
import { userauth } from './Router/userauth.js';
import adminauth from './Router/adminauth.js';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app=express();
app.use(json())
app.use(cors(({
    origin: 'http://127.0.0.1:5173',        //origin:'*' // * means aynody can give request
    credentials: true
 })))  


app.use('/',userauth);
app.use('/',adminauth);
mongoose.connect('mongodb://mongodb:27017/Certiapp').then(()=>{
    console.log("Mongodb connected Successfully to Certiapp");})
    .catch((error)=>{
        console.error("Mongodb connection failed",error);
});
app.listen(process.env.PORT,function(){
    console.log(`server is listening at ${process.env.PORT}`);
    
});