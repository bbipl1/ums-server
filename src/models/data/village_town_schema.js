// models/VillageTown.js
const mongoose = require('mongoose');

const VillageTownSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true, trim: true },
  gp: { type: mongoose.Schema.Types.ObjectId, ref: "gp", required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Village_town_model = mongoose.model("VillageTown", VillageTownSchema);
module.exports=Village_town_model;
