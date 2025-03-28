const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
  {
    map: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Map',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    permissionType: {
      type: String,
      enum: ['view', 'edit'],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MapPermission', permissionSchema);
