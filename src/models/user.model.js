const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'editor', 'viewer', 'tracker'],
      default: 'viewer',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        index: '2dsphere', // Enables GeoSpatial Queries
      },
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastActiveAt: {
      type: Date,
      default: Date.now,
    },
    maps: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Map',
      },
    ],
  },
  { timestamps: true }
);

// Middleware to auto-update lastActiveAt when location is updated
userSchema.pre('save', function (next) {
  if (this.isModified('location')) {
    this.lastActiveAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
