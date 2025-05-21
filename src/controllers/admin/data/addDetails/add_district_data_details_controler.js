
const District_model = require("../../../../models/data/district_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const add_district_data_details_controller = async (req, res) => {
  try {
    let { district_name, state_id } = req.body;

    let resData = null;
    district_name = district_name?.trim();
    state_id = state_id?.toString().trim();

    if (!district_name) {
      resData = { status: "failed", err: "District name is required." };
      return sendResponse(res, 400, resData);
    }
    if(!district_name && !state_id){
      resData = { status: "failed", err: "All fields are required." };
      return sendResponse(res, 400, resData);
    }

    const alreadyExist=await District_model.findOne({$and:[{name:district_name},{state:state_id}]});

    if(alreadyExist){
       resData = { status: "failed", err: "District already exist." };
      return sendResponse(res, 409, resData);
    }

    const data_to_save = {
      name: district_name,
      state: state_id,
    };

    const dbRes=await District_model.create(data_to_save);

    resData={
      status:"success",
      msg:`District ${dbRes?.name} added successfully`,
      data:dbRes,
    }

    sendResponse(res,200,resData);
  } catch (error) {
    const logData={
      err:error
    }
    log(logData);
    const resData = { err: "Internal server error", status: "failed" };
    sendResponse(res, 500, resData);
  }
};

module.exports = add_district_data_details_controller;
