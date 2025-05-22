const Country_model = require("../../../../models/data/country_schema");
const District_model = require("../../../../models/data/district_schema");
const GP_model = require("../../../../models/data/gp_schema");
const State_model = require("../../../../models/data/state_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const update_gp_data_details_controller = async (req, res) => {
  try {
    let { gp_name, new_gp_name, gp_id } = req.body;

    let resData = null;

    gp_name = gp_name?.trim();
    new_gp_name = new_gp_name?.trim();
    gp_id = gp_id?.trim();

    if (!new_gp_name || !gp_id) {
      resData = { status: "failed", err: "All fields are required." };
      return sendResponse(res, 400, resData);
    }

    if (gp_name === new_gp_name) {
      resData = {
        status: "failed",
        err: "Kindly choose new gram panchayat name to update.",
      };
      return sendResponse(res, 409, resData);
    }
    const find_doc = await GP_model.findById(gp_id);
    if (!find_doc) {
      resData = {
        status: "failed",
        err: `${gp_name} is not found.`,
      };
      return sendResponse(res, 404, resData);
    }
    find_doc.name = new_gp_name;
    const updated_data = await find_doc.save();
    resData = {
        status: "success",
        msg:`${gp_name} is updated to ${new_gp_name} successfully.` ,
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

module.exports = update_gp_data_details_controller;
