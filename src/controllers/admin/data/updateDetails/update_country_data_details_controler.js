const Country_model = require("../../../../models/data/country_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const update_country_data_details_controller = async (req, res) => {
  try {
    let { country_name, new_country_name, country_id } = req.body;

    let resData = null;

    country_name = country_name?.trim();
    new_country_name = new_country_name?.trim();
    country_id = country_id?.trim();

    if (!country_name || !new_country_name || !country_id) {
      resData = { status: "failed", err: "All fields are required." };
      return sendResponse(res, 400, resData);
    }

    if (country_name === new_country_name) {
      resData = {
        status: "failed",
        err: "Kindly choose new country name to update.",
      };
      return sendResponse(res, 409, resData);
    }
    const find_doc = await Country_model.findById(country_id);
    if (!find_doc) {
      resData = {
        status: "failed",
        err: `${country_name} is not found.`,
      };
      return sendResponse(res, 404, resData);
    }
    find_doc.name = new_country_name;
    const updated_data = await find_doc.save();
    resData = {
        status: "failed",
        msg:`${country_name} is updated to ${new_country_name} successfully.` ,
      };
    return sendResponse(res, 200, resData);
    
  } catch (error) {
    log(error);
    const resData = { err: "Internal server error", status: "failed" };
    sendResponse(res, 500, resData);
  }
};

module.exports = update_country_data_details_controller;
