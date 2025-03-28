const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema(
  {
    mapName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    layers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Layer', // Reference to Layer Model
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User Model
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MapPermission', // Map access control
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Map', mapSchema);
