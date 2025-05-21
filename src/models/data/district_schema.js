// models/District.js
const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true, trim: true },
  state: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const District_model = mongoose.model("District", DistrictSchema);
module.exports=District_model
