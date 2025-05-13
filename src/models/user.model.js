const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String, required: false },
      lastName: { type: String, required: true },
    },
    mobile: {
      countryCode: { type: String, required: true, unique: false },
      mobileNumber: { type: String, required: true, unique: false },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
      unique: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "viewer", "b2b"],
      default: "viewer",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere", // Enables GeoSpatial Queries
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
        ref: "Map",
      },
    ],
  },
  { timestamps: true }
);

// Middleware to auto-update lastActiveAt when location is updated
userSchema.pre("save", function (next) {
  if (this.isModified("location")) {
    this.lastActiveAt = Date.now();
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
