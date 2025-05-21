// models/State.js
const mongoose = require('mongoose');

const StateSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true, trim: true },
  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
  isActive: { type: Boolean, default: false }
}, { timestamps: true });

const State_model = mongoose.model("State", StateSchema);
module.exports=State_model;
