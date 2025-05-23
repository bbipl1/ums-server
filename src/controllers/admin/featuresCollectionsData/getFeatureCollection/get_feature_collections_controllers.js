const GeoFeatureCollection = require("../../../../models/featureCollections/featureCollectionsSchema");
const sendResponse = require("../../../../utils/sendResponse");

const get_feature_collections_controller = async (req, res) => {
  let resData = null;
  try {
    let {
      country,
      state,
      district,
      sub_district,
      gp,
      village_town,
      category,
      geometry_type,
      isBounryReq,
    } = req.body;
    country = country?.trim();
    state = state?.trim();
    district = district?.trim();
    sub_district = sub_district?.trim();
    gp = gp?.trim();
    village_town = village_town?.trim();
    category = category?.trim();
    geometry_type = geometry_type?.trim();

    const query = {};

    if (country) query["features.properties.country"] = country;
    if (state) query["features.properties.state"] = state;
    if (district) query["features.properties.district"] = district;
    if (sub_district) query["features.properties.subdistrict"] = sub_district;
    if (gp) query["features.properties.gp"] = gp;
    if (village_town) query["features.properties.village"] = village_town;
    if (category) query["features.properties.category"] = category;
    if (geometry_type) query["features.geometry.type"] = geometry_type;

    const result = await GeoFeatureCollection.find(query);
    resData = {
      msg: "data received successfully.",
      data: result,
    };
    sendResponse(res, 200, resData);
  } catch (error) {
    const logData = {
      err: error,
    };
    log(logData);
    resData = {
      err: "Server internal error",
      data: null,
    };
    sendResponse(res, 500, resData);
  }
};
module.exports = get_feature_collections_controller;
