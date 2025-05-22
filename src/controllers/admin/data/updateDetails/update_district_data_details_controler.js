const Country_model = require("../../../../models/data/country_schema");
const District_model = require("../../../../models/data/district_schema");
const State_model = require("../../../../models/data/state_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const update_district_data_details_controller = async (req, res) => {
  try {
    let { district_name, new_district_name, district_id } = req.body;

    let resData = null;

    district_name = district_name?.trim();
    new_district_name = new_district_name?.trim();
    district_id = district_id?.trim();

    if (!district_name || !new_district_name || !district_id) {
      resData = { status: "failed", err: "All fields are required." };
      return sendResponse(res, 400, resData);
    }

    if (district_name === new_district_name) {
      resData = {
        status: "failed",
        err: "Kindly choose new district name to update.",
      };
      return sendResponse(res, 409, resData);
    }
    const find_doc = await District_model.findById(district_id);
    if (!find_doc) {
      resData = {
        status: "failed",
        err: `${district_name} is not found.`,
      };
      return sendResponse(res, 404, resData);
    }
    find_doc.name = new_district_name;
    const updated_data = await find_doc.save();
    resData = {
        status: "success",
        msg:`${district_name} is updated to ${new_district_name} successfully.` ,
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

module.exports = update_district_data_details_controller;
