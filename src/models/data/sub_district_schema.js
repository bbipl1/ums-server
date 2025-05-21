// models/SubDistrict.js
const mongoose = require('mongoose');

const SubDistrictSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true, trim: true },
  district: { type: mongoose.Schema.Types.ObjectId, ref: "District", required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Sub_district_model = mongoose.model("SubDistrict", SubDistrictSchema);
module.exports=Sub_district_model;
