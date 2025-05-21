const Country_model = require("../../../../models/data/country_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const add_country_data_details_controller = async (req, res) => {
  try {
    let { country_name } = req.body;

    let resData = null;

    country_name = country_name?.trim();
    if (!country_name) {
      resData = { status: "failed", err: "Country name is required" };
      return sendResponse(res, 400, resData);
    }
    const alreadyExist = await Country_model.findOne({ name: country_name });
    if (alreadyExist) {
      resData = {
        status: "failed",
        err: "Country already exist.",
      };
      return sendResponse(res, 409, resData);
    }
    const data_to_save = {
      name: country_name,
    };
    const dbRes = await Country_model.create(data_to_save);

    resData = {
      status: "success",
      msg: `Country ${dbRes?.name} added successfully`,
      data: dbRes,
    };

    sendResponse(res, 200, resData);
  } catch (error) {
    log(error);
    const resData = { err: "Internal server error", status: failed };
    sendResponse(res, 500, resData);
  }
};

module.exports = add_country_data_details_controller;
