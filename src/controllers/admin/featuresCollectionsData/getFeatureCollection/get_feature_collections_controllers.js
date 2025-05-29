const GeoFeatureCollection = require("../../../../models/featureCollections/featureCollectionsSchema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const get_feature_collections_controller = async (req, res) => {
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
    } = req.query;

    // Trim input values
    country = country?.trim();
    state = state?.trim();
    district = district?.trim();
    sub_district = sub_district?.trim();
    gp = gp?.trim();
    village_town = village_town?.trim();
    category = category?.trim();
    geometry_type = geometry_type?.trim();

    // Build the filter object dynamically for $elemMatch and $filter
    const elemMatchConditions = {};
    if (country) elemMatchConditions["properties.country"] = country;
    if (state) elemMatchConditions["properties.state"] = state;
    if (district) elemMatchConditions["properties.district"] = district;
    if (sub_district)
      elemMatchConditions["properties.subdistrict"] = sub_district;
    if (gp) elemMatchConditions["properties.gp"] = gp;
    if (village_town) elemMatchConditions["properties.village"] = village_town;
    if (category) elemMatchConditions["properties.category"] = category;
    if (geometry_type) elemMatchConditions["geometry.type"] = geometry_type;

    // If no filter provided, maybe return empty or all docs (your choice)
    if (Object.keys(elemMatchConditions).length === 0) {
      const result=await GeoFeatureCollection.find();
      return sendResponse(res, 200, {
        msg: "Data received successfully.",
        data: result,
      });
    }

    // Build $and array for $filter cond stage in aggregation
    const filterConditions = Object.entries(elemMatchConditions).map(
      ([key, value]) => {
        return { $eq: [`$$feature.${key}`, value] };
      }
    );

    // Run aggregation pipeline
    const result = await GeoFeatureCollection.aggregate([
      {
        $match: {
          features: { $elemMatch: elemMatchConditions },
        },
      },
      {
        $project: {
          features: {
            $filter: {
              input: "$features",
              as: "feature",
              cond:
                filterConditions.length > 1
                  ? { $and: filterConditions }
                  : filterConditions[0],
            },
          },
        },
      },
    ]);

    sendResponse(res, 200, {
      msg: "Data received successfully.",
      data: result,
    });
  } catch (error) {
    log({ err: error });
    sendResponse(res, 500, {
      err: "Server internal error",
      data: null,
    });
  }
};
module.exports = get_feature_collections_controller;
