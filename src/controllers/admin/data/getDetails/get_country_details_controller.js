const Country_model = require("../../../../models/data/country_schema");
const log = require("../../../../utils/logger")
const sendResponse = require("../../../../utils/sendResponse")

const get_country_details_controller= async(req,res)=>{
    try {

        let {id}=req.query;
        id=id?.toString()?.trim();
        let resData=null;
        if(id){
            resData=await Country_model.findById(id);
        }else{
            resData=await Country_model.find();
        }

        console.log(resData);
        const data_to_send={
            msg:"data received successfully",
            status:"success",
            data:resData,
        }

        return sendResponse(res,200,data_to_send);
        
    } catch (error) {
        log(error)
        const sendResData={
            err:"Server internal error",
            status:500
        }
        return sendResponse(sendResData)
    }
}

module.exports=get_country_details_controller;