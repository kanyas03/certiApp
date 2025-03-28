import { Schema } from "mongoose";
import { model } from "mongoose";


const certi =new Schema({
    certiId :{type:String,required:true,unique:true},
    selectcourse:{type:String,required:true},
    cani_name:{type:String,required:true},
    grade:{type:String,required:true},
    Issuedate:{type:String,required:true}
})
const certificate = model('certidetail',certi)
export {certificate}