// Tag Document Schema
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const tag=new Schema(
    {
        name:{type: String, reuqired: true},
        creator_id: { type: String, reuqired: true },
    }
)
tag.set('toJSON',{virtuals:true});
tag.virtual('url').get(()=>{
    return `post/answer/${this._id};`
});
module.exports=mongoose.model('Tag',tag);