const Country_model = require("../../../../models/data/country_schema");
const District_model = require("../../../../models/data/district_schema");
const State_model = require("../../../../models/data/state_schema");
const Sub_district_model = require("../../../../models/data/sub_district_schema");
const Village_town_model = require("../../../../models/data/village_town_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const get_all_data_controller = async (req, res) => {
  try {
    const resData = await Country_model.aggregate([
      // Get states
      {
        $lookup: {
          localField: "_id",
          from: "states",
          foreignField: "country",
          as: "state",
        },
      },
      {
        $unwind: {
          path: "$state",
          preserveNullAndEmptyArrays: true, // <- keep even if no state
        },
      },

      //get districts
      {
        $lookup: {
          localField: "state._id",
          from: "districts",
          foreignField: "state",
          as: "district",
        },
      },
      {
        $unwind: {
          path: "$district",
          preserveNullAndEmptyArrays: true, // <- keep even if no state
        },
      },
      //get subdistrict
      {
        $lookup: {
          localField: "district._id",
          from: "subdistricts",
          foreignField: "district",
          as: "sub_district",
        },
      },
      {
        $unwind: {
          path: "$sub_district",
          preserveNullAndEmptyArrays: true, // <- keep even if no state
        },
      },

      //get all-gp
      {
        $lookup: {
          localField: "sub_district._id",
          from: "gps",
          foreignField: "subDistrict",
          as: "gp",
        },
      },
      {
        $unwind: {
          path: "$gp",
          preserveNullAndEmptyArrays: true, // <- keep even if no state
        },
      },
      //get village-town
      {
        $lookup: {
          localField: "gp._id",
          from: "villagetowns",
          foreignField: "gp",
          as: "village_town",
        },
      },
      {
        $unwind: {
          path: "$village_town",
          preserveNullAndEmptyArrays: true, // <- keep even if no state
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          state: 1, // Contains array of matched states
          district: 1,
          'sub_district':1,
          'village_town':1,
          gp:1,
        },
      },
    ]);

    console.log(resData);
    const data_to_send = {
      msg: "data received successfully",
      status: "success",
      data: resData,
    };

    return sendResponse(res, 200, data_to_send);
  } catch (error) {
    log(error);
    const sendResData = {
      err: "Server internal error",
      status: "failed",
    };
    return sendResponse(res,500,sendResData);
  }
};

module.exports = get_all_data_controller;
