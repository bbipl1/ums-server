const State_model = require("../../../../models/data/state_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const get_state_details_controller = async (req, res) => {
  try {
    let { id, populate_country } = req.query;
    id = id?.toString()?.trim();
    let resData = null;
    if (id) {
      if (populate_country) {
        resData = await State_model.findById(id).populate("country");
      } else {
        resData = await State_model.findById(id);
      }
    } else {
      if (populate_country) {
        resData = await State_model.find().populate("country");
      } else {
        resData = await State_model.find();
      }
    }

    const data_to_send = {
      msg: "state data received successfully",
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

module.exports = get_state_details_controller;
