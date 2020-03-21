const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Create Schema
const TypeSchema = new Schema({
    typeName:{
        type:String,
        require:true
    }, 
    icon:{
        type:String,
        require:true
    }
})

module.exports = Profile = mongoose.model("type",TypeSchema);