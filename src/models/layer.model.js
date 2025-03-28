const mongoose = require('mongoose');

const layerSchema = new mongoose.Schema(
  {
    layerName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Point', 'Polygon', 'LineString'],
      required: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
    map: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Map', // Linked to Map
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Layer', layerSchema);
