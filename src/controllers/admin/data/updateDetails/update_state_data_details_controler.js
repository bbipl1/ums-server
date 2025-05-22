const Country_model = require("../../../../models/data/country_schema");
const State_model = require("../../../../models/data/state_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const update_state_data_details_controller = async (req, res) => {
  try {
    let { state_name, new_state_name, state_id } = req.body;

    let resData = null;

    state_name = state_name?.trim();
    new_state_name = new_state_name?.trim();
    state_id = state_id?.trim();

    if (!state_name || !new_state_name || !state_id) {
      resData = { status: "failed", err: "All fields are required." };
      return sendResponse(res, 400, resData);
    }

    if (state_name === new_state_name) {
      resData = {
        status: "failed",
        err: "Kindly choose new state name to update.",
      };
      return sendResponse(res, 409, resData);
    }
    const find_doc = await State_model.findById(state_id);
    if (!find_doc) {
      resData = {
        status: "failed",
        err: `${state_name} is not found.`,
      };
      return sendResponse(res, 404, resData);
    }
    find_doc.name = new_state_name;
    const updated_data = await find_doc.save();
    resData = {
        status: "success",
        msg:`${state_name} is updated to ${new_state_name} successfully.` ,
      };
    return sendResponse(res, 200, resData);
    
  } catch (error) {
    const logData={
        err:error
    }
    log(logData);
    const resData = { err: "Internal server error", status: "failed" };
    sendResponse(res, 500, resData);
  }
};

module.exports = update_state_data_details_controller;
