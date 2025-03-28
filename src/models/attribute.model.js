const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema(
  {
    feature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feature',
    },
    key: {
      type: String,
      required: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attribute', attributeSchema);
