const mongoose = require('mongoose');
const DonationSchema = new mongoose.Schema({
  name:String,
  email:String,
  amount:Number,
  project:{type: mongoose.Schema.Types.ObjectId, ref:'Project', required:false},
  createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Donation', DonationSchema);
