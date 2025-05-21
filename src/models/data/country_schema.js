// models/Country.js
const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, lowercase: true, trim: true },
  isActive: { type: Boolean, default: false }
}, { timestamps: true });

const Country_model= mongoose.model("Country", CountrySchema);
module.exports=Country_model;
