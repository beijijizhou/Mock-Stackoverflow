// Question Document Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questions = new Schema({
  title: { type: String, maxlength: 100 },
  text: { type: String, reuqired: true },
  summary:{type: String, reuqired: true,  maxlength: 140},
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  asked_by: { type: String, reuqired: true },
  creator_id: { type: String, reuqired: true },
  askedAt: { type: Date, reuqired: true, default: new Date() },
  views: { type: Number, reuqired: true, default: 0 },
  votes: { type: Number, reuqired: true, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  votemap: { type: Map, of: Number, default:{}},
  
});
questions.set("toJSON", { virtuals: true });
questions.virtual("url").get(() => {
  return `post/answer/${this._id};`;
});
module.exports = mongoose.model("Question", questions);
