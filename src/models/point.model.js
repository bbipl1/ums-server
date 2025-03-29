const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['FeatureCollection'],
      required: true,
      default: 'FeatureCollection',
    },
    name: {
      type: String,
      required: true,
      default: 'Point',
    },
    crs: {
      type: {
        type: String,
        enum: ['name'],
        default: 'name',
      },
      properties: {
        name: {
          type: String,
          required: true,
          default: 'urn:ogc:def:crs:EPSG::32643', // UTM Zone 43N
        },
      },
    },
    features: [
      {
        type: {
          type: String,
          enum: ['Feature'],
          required: true,
          default: 'Feature',
        },
        properties: {
          textString: {
            type: String, // "TEXTSTRING" from properties
            required: true,
          },
          textSize: {
            type: Number, // "TEXT_SIZE" from properties
            required: false,
          },
          textAngle: {
            type: Number, // "TEXT_ANGLE" from properties
            required: false,
          },
        },
        geometry: {
          type: {
            type: String,
            enum: ['Point'],
            required: true,
          },
          coordinates: {
            type: [Number], // [Easting, Northing] in UTM
            required: true,
          },
        },
      },
    ],
  },
  { timestamps: true }
);

const Point = mongoose.model('Point', pointSchema);
module.exports = Point;
