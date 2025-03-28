const mongoose = require('mongoose');

const roadLineSchema = new mongoose.Schema(
  {
    id: {
      type: Number, // "Id" from properties
      required: true,
      default: 0,
    },
    geometry: {
      type: {
        type: String,
        enum: ['MultiLineString'], // Only accept MultiLineString
        required: true,
      },
      coordinates: {
        type: [[[Number]]], // Array of arrays of arrays of numbers -> [ [ [x, y], [x, y] ] ]
        required: true,
      },
    },
    crs: {
      type: String,
      default: 'EPSG:32643', // UTM Zone 43N by default
    },
  },
  { timestamps: true }
);

roadLineSchema.index({ geometry: '2dsphere' }); // Enable spatial indexing for geospatial queries

const RoadLine = mongoose.model('RoadLine', roadLineSchema);
module.exports =RoadLine;
