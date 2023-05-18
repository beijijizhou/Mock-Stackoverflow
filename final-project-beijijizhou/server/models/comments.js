const mongoose=require('mongoose')
const Schema=mongoose.Schema
const comment=new Schema(
    {    
        text:{type: String, reuqired: true},
        asked_by:{type: String, reuqired: true},
        create_time:{type: Date,reuqired: true,default:new Date()},
    }
)
module.exports=mongoose.model('Comment',comment);