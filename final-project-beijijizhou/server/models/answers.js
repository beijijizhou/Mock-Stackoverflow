// Answer Document Schema
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const answer=new Schema(
    {    
        text:{type: String, reuqired: true},
        ans_by:{type: String,reuqired: true},
        creator_id:{type: String, reuqired: true},
        ans_date_time:{type: Date,reuqired: true,default:new Date()},
        comments:[{type: mongoose.Schema.Types.ObjectId,ref:"Comment"}],
        votes:{type:Number,reuqired: true,default:0},
        votemap: { type: Map, of: Number, default:{}},
    }
)

answer.set('toJSON',{virtuals:true});
answer.virtual('url').get(()=>{
    return `post/answer/${this._id};`
});

module.exports=mongoose.model('Answer',answer);