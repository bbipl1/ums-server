const GeoFeatureCollection = require("../../../../models/featureCollections/featureCollectionsSchema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const add_feature_collections_controller = async (req, res) => {
  let resData = null;
  try {
    const { features } = req.body;
    console.log(features);
    if (!features) {
      resData = {
        err: "Invalid data.",
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

    const doc=await GeoFeatureCollection.findOne();

    console.log(doc)

    if(!doc?.length>0){
        await GeoFeatureCollection.insertOne({type:'FeatureCollection'})
    }

     for  (const f of features){
        f.geometry.coordinates=JSON.parse(f.geometry.coordinates);
        console.log(f.geometry.coordinates)
        doc.features?.push(f);
    }

    await doc.save();

     resData = {
        msg: "data inserted successfully.",
        status: "success",
        data: features,
      };
      return sendResponse(res, 200, resData);

  } catch (error) {
    const logData = {
      err: error,
    };
    log(logData);
    // console.log(error);
    resData = {
      err: "Server internal error.",
      data: null,
    };
    return sendResponse(res, 500, resData);
  }
};

module.exports = add_feature_collections_controller;
