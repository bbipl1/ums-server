const State_model = require("../../../../models/data/state_schema");
const log = require("../../../../utils/logger");
const sendResponse = require("../../../../utils/sendResponse");

const add_state_data_details_controller = async (req, res) => {
  try {

    console.log("adding")
    let { state_name, country_id } = req.body;

    let resData = null;
    state_name = state_name?.trim();
    country_id = country_id?.toString()?.trim();

    if (!state_name) {
      resData = { status: "failed", err: "State name is required." };
      return sendResponse(res, 400, resData);
    }
    if(!state_name && !country_id){
      resData = { status: "failed", err: "All fields are required." };
      return sendResponse(res, 400, resData);
    }

    const alreadyExist=await State_model.findOne({$and:[{name:state_name},{country:country_id}]})
    if(alreadyExist){
      console.log(alreadyExist)
      resData = { status: "failed", err: "State already exist." };
      return sendResponse(res, 409, resData);
    }

    const data_to_save = {
      name: state_name,
      country: country_id,
    };

    const dbRes=await State_model.create(data_to_save);

    resData={
      status:"success",
      msg:`State ${dbRes?.name} added successfully`,
      data:dbRes,
    }

    sendResponse(res,200,resData);
  } catch (error) {
    const errLog={
      err:error
    }
    log(errLog);
    const resData = {err: "Internal server error", status: "failed" };
    sendResponse(res, 500, resData);
  }
};

module.exports = add_state_data_details_controller;
