const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  title:String,
  slug:String,
  summary:String,
  content:String,
  goal:Number,
  raised:{type:Number, default:0},
  active:{type:Boolean, default:true},
  images:[String]
}, {timestamps:true});
module.exports = mongoose.model('Project', ProjectSchema);
