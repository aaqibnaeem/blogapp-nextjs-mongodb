import mongoose from "mongoose";

let blogSchema = mongoose.Schema({
    title:String,
    description:String,
    user_id:String
})

if( mongoose.models["blog"]){
    delete  mongoose.models["blog"]

}

export const blogModel = mongoose.model("blog",blogSchema)