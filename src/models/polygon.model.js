const mongoose = require('mongoose');

const polySchema = new mongoose.Schema(
  {
    id: {
      type: Number, // "Id" from properties
      required: true,
      default: 0,
    },
    geometry: {
      type: {
        type: String,
        enum: ['MultiPolygon'], // Only accept MultiPolygon
        required: true,
      },
      coordinates: {
        type: [[[[Number]]]], // Array of arrays of arrays of arrays for MultiPolygon -> [ [ [ [x, y], [x, y] ] ] ]
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

// Enable spatial indexing for geospatial queries
polySchema.index({ geometry: '2dsphere' });

const Polygon = mongoose.model('Polygon', polySchema);
module.exports = Polygon;
