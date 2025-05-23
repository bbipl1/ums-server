const mongoose = require("mongoose");

const geoJSONSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Feature"],
    required: true,
    default: "Feature"
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point", "LineString", "Polygon"],
      required: true
    },
    coordinates: {
      type: [],
      required: true
    }
  },
  properties: {
    id: { type: String },
    name: { type: String },
    featureType: { type: String, enum: ["Point", "LineString", "Polygon"] },
    description: { type: String },
    category: { type: String },

    // Location Filters
    country: { type: String },
    state: { type: String },
    district: { type: String },
    subDistrict: { type: String },
    gp: { type: String },
    village: { type: String }
  }
});

// FeatureCollection schema
const featureCollectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["FeatureCollection"],
    default: "FeatureCollection"
  },
  features: [geoJSONSchema]
});


geoJSONSchema.index({ geometry: "2dsphere" });

const GeoFeatureCollection= mongoose.model("GeoFeatureCollection", featureCollectionSchema);
module.exports= GeoFeatureCollection;
