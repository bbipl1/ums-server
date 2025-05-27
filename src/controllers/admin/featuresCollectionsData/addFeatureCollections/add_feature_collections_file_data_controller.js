const GeoFeatureCollection = require("../../../../models/featureCollections/featureCollectionsSchema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const add_feature_collections_file_data_controller = async (req, res) => {
  let resData = null;

//   console.log(req.files)

  try {
    if (!req.file) {
      resData = {
        err: "No file uploaded.",
        status: "failed",
        data: null,
      };
      return sendResponse(res, 400, resData);
    }

    // Parse JSON from uploaded file
    const fileContent = req.file.buffer.toString('utf-8');
    // console.log("parsing...")
    const parsed = JSON.parse(fileContent);
    // console.log(parsed)
    if(!parsed){
         resData = {
        err: "Json file has invalid data.",
        status: "failed",
        data: null,
      };
      return sendResponse(res, 400, resData);
    }

    const features = parsed;
    // console.log(parsed[0]);

    if (!features || !Array.isArray(features) || features.length === 0) {
      resData = {
        err: "Invalid or empty feature collection.",
        status: "failed",
        data: null,
      };
      return sendResponse(res, 400, resData);
    }

    if (features[0]?.type !== "Feature") {
      resData = {
        err: "Invalid geojson data.",
        status: "failed",
        data: null,
      };
      return sendResponse(res, 400, resData);
    }

    // Find or create FeatureCollection document
    let doc = await GeoFeatureCollection.findOne();

    if (!doc) {
      doc = await GeoFeatureCollection.create({ type: "FeatureCollection", features: [] });
    }

    for (const f of features) {
      if (typeof f.geometry.coordinates === 'string') {
        f.geometry.coordinates = JSON.parse(f.geometry.coordinates);
      }
      doc.features.push(f);
    }

    await doc.save();

    resData = {
      msg: "GeoJSON data inserted successfully.",
      status: "success",
      data: features,
    };
    return sendResponse(res, 200, resData);

  } catch (error) {
    const logData = { err: error };
    log(logData);

    resData = {
      err: "Server internal error.",
      status: "failed",
      data: null,
    };
    return sendResponse(res, 500, resData);
  }
};

module.exports = add_feature_collections_file_data_controller;
