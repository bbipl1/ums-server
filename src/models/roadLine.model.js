const mongoose = require('mongoose');

const roadLineSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      default: 0, // corresponds to "properties.Id"
    },
    type: {
      type: String,
      enum: ['Feature'],
      default: 'Feature',
    },
    geometry: {
      type: {
        type: String,
        enum: ['MultiLineString'],
        required: true,
      },
      coordinates: {
        type: [[[Number]]], // Array of arrays of arrays of numbers → [[[x, y], [x, y], ...]]
        required: true,
      },
    },
    crs: {
      type: String,
      default: 'EPSG:32643', // UTM Zone 43N
    },
    properties: {
      Id: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

// ❌ DO NOT use 2dsphere index since UTM is not supported for it
// roadLineSchema.index({ geometry: '2dsphere' });

const RoadLine = mongoose.model('RoadLine', roadLineSchema);
module.exports = RoadLine;
