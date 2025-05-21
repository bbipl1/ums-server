const District_model = require("../../../../models/data/district_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const get_district_details_controller = async (req, res) => {
  try {
    let { id, populate_country, populate_state } = req.query;
    id = id?.toString()?.trim();
    let resData = null;
    if (id) {
      if (populate_country && populate_state) {
        resData = await District_model.findById(id)
          .populate("country")
          .populate("state");
      } else if (populate_country) {
        resData = await District_model.findById(id).populate("country");
      } else if (populate_state) {
        resData = await District_model.findById(id).populate("state");
      } else {
        resData = await District_model.findById(id);
      }
    } else {
      if (populate_country && populate_state) {
        resData = await District_model.findById(id)
          .populate("country")
          .populate("state");
      } else if (populate_country) {
        resData = await District_model.findById(id).populate("country");
      } else if (populate_state) {
        resData = await District_model.findById(id).populate("state");
      } else {
        resData = await District_model.findById(id);
      }
    }

    const data_to_send = {
      msg: "district data received successfully",
      status: "success",
      data: resData,
    };

    return sendResponse(res, 200, data_to_send);
  } catch (error) {
    log(error);
    const sendResData = {
      err: "Server internal error",
      status: 500,
    };
    return sendResponse(sendResData);
  }
};

module.exports = get_district_details_controller;
