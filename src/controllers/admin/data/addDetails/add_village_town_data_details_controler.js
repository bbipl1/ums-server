
const Sub_district_model = require("../../../../models/data/sub_district_schema");
const Village_town_model = require("../../../../models/data/village_town_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const add_village_town_data_details_controller = async (req, res) => {
  try {
    let { village_town_name,sub_district_id } = req.body;

    let resData = null;
    village_town_name = village_town_name?.trim();
    sub_district_id = sub_district_id?.toString()?.trim();

    if (!village_town_name) {
      resData = { status: "failed", err: "Village/town name is required." };
      return sendResponse(res, 400, resData);
    }
    if(!village_town_name && !sub_district_id){
      resData = { status: "failed", err: "Add sub-district first." };
      return sendResponse(res, 400, resData);
    }

    const data_to_save = {
      name: village_town_name,
      subDistrict: sub_district_id,
    };

    const alreadyExist=await Village_town_model.findOne({$and:[{name:village_town_name},{subDistrict:sub_district_id}]})
    if(alreadyExist){
      resData = { status: "failed", err: "Village/town already exist." };
      return sendResponse(res, 409, resData);
    }

    const dbRes=await Village_town_model.create(data_to_save);

    resData={
      status:"success",
      msg:`Village/town ${dbRes?.name} added successfully`,
      data:dbRes,
    }

    sendResponse(res,200,resData);
  } catch (error) {
    const logData={err:error};
    log(logData);
    const resData = { err: "Internal server error", status: "failed" };
    sendResponse(res, 500, resData);
  }
};

module.exports = add_village_town_data_details_controller;
