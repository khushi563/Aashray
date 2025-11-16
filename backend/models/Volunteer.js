const mongoose = require('mongoose');
const VolunteerSchema = new mongoose.Schema({
  name:String, email:String, phone:String, availability:String, interests:[String]
}, {timestamps:true});
module.exports = mongoose.model('Volunteer', VolunteerSchema);
