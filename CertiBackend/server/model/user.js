import { Schema } from "mongoose";
import { model } from "mongoose";


const users =new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    userName:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    
})
const User = model('sample1',users)
export {User}