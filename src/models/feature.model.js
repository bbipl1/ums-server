const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Point', 'Polygon', 'LineString'],
      required: true,
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point', 'Polygon', 'LineString'],
        required: true,
      },
      coordinates: {
        type: Array,
        required: true,
      },
    },
    properties: {
      type: Object,
      default: {},
    },
    layer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Layer', // Belongs to a Layer
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feature', featureSchema);
