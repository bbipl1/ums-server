const mongoose = require("mongoose");

const poiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String, // e.g., restaurant, hospital, atm
    required: true,
  },
  tags: [String], // Additional tags for filtering or categorization

  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
  },

  // 🌍 WGS84 Location (lat/lng)
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },

  // 🧭 UTM Location
  utm: {
    easting: { type: Number, required: true },
    northing: { type: Number, required: true },
    zoneNumber: { type: Number, required: true },
    zoneLetter: { type: String, required: true },
  },

  // 📶 Zoom visibility range
  visibleAtZoom: {
    min: { type: Number, default: 12 },
    max: { type: Number, default: 22 },
  },

  // 📌 Marker importance
  importance: {
    type: Number, // 1 = low, 10 = high
    default: 5,
  },

  // ⭐ Ratings
  rating: {
    type: Number,
    default: 0,
  },
  user_ratings_total: {
    type: Number,
    default: 0,
  },

  // ☎️ Contact Info
  phone_number: String,
  website: String,

  // 🕐 Opening Hours
  opening_hours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String },
  },

  // 🔴 Real-time status
  real_time_status: {
    isOpen: Boolean,
    queueTime: Number, // in minutes
    occupancy: Number, // current occupancy
  },

  // 📷 Media
  icon_url: String,
  photos: [String],

  // 🏷️ Source tracking
  source: {
    type: String, // e.g., "google_api", "manual"
  },
  createdBy: {
    type: String, // userId or system
  },

  // ✅ Status flag
  isActive: {
    type: Boolean,
    default: true,
  },

  last_updated: {
    type: Date,
    default: Date.now,
  },
});

// 📌 Create geo index
poiSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("POI", poiSchema);
