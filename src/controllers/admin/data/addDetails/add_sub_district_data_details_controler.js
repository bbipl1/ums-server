
const Sub_district_model = require("../../../../models/data/sub_district_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const add_sub_district_data_details_controller = async (req, res) => {
  try {
    let { sub_district_name, district_id } = req.body;

    let resData = null;
    sub_district_name = sub_district_name?.trim();
    district_id = district_id?.toString()?.trim();

    if (!sub_district_name) {
      resData = { status: "failed", err: "Sub district name is required." };
      return sendResponse(res, 400, resData);
    }
    if(!sub_district_name && !district_id){
      resData = { status: "failed", err: "Add district first." };
      return sendResponse(res, 400, resData);
    }

    const alreadyExist=await Sub_district_model.findOne({$and:[{name:sub_district_name},{district:district_id}]})
    if(alreadyExist){
      resData = { status: "failed", err: "Sub district already exist." };
      return sendResponse(res, 409, resData);
    }

    const data_to_save = {
      name: sub_district_name,
      district: district_id,
    };

    const dbRes=await Sub_district_model.create(data_to_save);

    resData={
      status:"success",
      msg:`Sub district ${dbRes?.name} added successfully`,
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

module.exports = add_sub_district_data_details_controller;
