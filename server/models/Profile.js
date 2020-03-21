const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Create Schema
const ProfileSchema = new Schema({
    typeName:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    }, 
    view_count:{
        type:Number,   
    }, 
    article_content:{
        type:String,
        require:true
    }, 
    introduce:{
        type:String,
        require:true
    }, 
    addTime:{
        type:Number,
        require:true
    } 
})





module.exports = Profile = mongoose.model("profile",ProfileSchema);