// models/VillageTown.js
const mongoose = require('mongoose');

const gp = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true, trim: true },
  subDistrict: { type: mongoose.Schema.Types.ObjectId, ref: "SubDistrict", required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const GP_model = mongoose.model("gp", gp);
module.exports=GP_model;
