const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema(
  {
    textString: {
      type: String, // "TEXTSTRING" from properties
      required: true,
    },
    textSize: {
      type: Number, // "TEXT_SIZE" from properties
      required: false,
    },
    textAngle: {
      type: Number, // "TEXT_ANGLE" from properties
      required: false,
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point'], // Restrict to 'Point' type only
        default: 'Point',
      },
      coordinates: {
        type: [Number], // Array of numbers [Easting, Northing] in UTM
        required: true,
      },
    },
    crs: {
      type: String,
      default: 'EPSG:32643', // Coordinate reference system (UTM Zone 43N)
    },
  },
  { timestamps: true }
);

pointSchema.index({ geometry: '2dsphere' }); // Enable spatial indexing for queries
const Point = mongoose.model('Point', pointSchema);
module.exports = Point;
