const mongoose=require('mongoose');
const Questions = require('./questions');
const Schema=mongoose.Schema
const user=new Schema(
    {    
        username:{type: String, reuqired: true},
        email:{type: String,reuqired: true},
        password:{type: String,reuqired: true},
        create_time:{type: Date,reuqired: true,default:new Date()},
        reputation:{type: Number, reuqired: true,default:0},
        // questions:[{type: mongoose.Schema.Types.ObjectId,ref: 'Question'}],
        // answers:[{type: mongoose.Schema.Types.ObjectId,ref: 'Answer'}],
        
    }
)

module.exports=mongoose.model('User',user);