const Sub_district_model = require("../../../../models/data/sub_district_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const get_village_town_details_controller = async (req, res) => {
  try {
    let {
      id,
      populate_country,
      populate_state,
      populate_district,
      populate_sub_district,
    } = req.query;
    id = id?.toString()?.trim();
    let query = null;
    if (id) {
      query = Sub_district_model.findById(id);
    } else {
      query = Sub_district_model.find({});
    }

    if (populate_country) query = query.populate("country");
    if (populate_state) query = query.populate("state");
    if (populate_district) query = query.populate("district");
    if (populate_sub_district) query = query.populate("subDistrict");

    const resData = await query;

    const data_to_send = {
      msg: "villages/towns data received successfully",
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
    return sendResponse(res, 500, sendResData); // ✅ Fixed
  }
};

module.exports = get_village_town_details_controller;
