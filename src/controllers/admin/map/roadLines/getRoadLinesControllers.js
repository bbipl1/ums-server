const RoadLine=require('../../../../models/roadLine.model');
const getRoadLinesControllers=async(req,res)=>{
try {
    const roadLines=await RoadLine.find();
    const dataToSend={
        msg:"data fetched successfully.",
        data:roadLines
    }

    console.log("roadlines are",roadLines);

    res.status(200).json(dataToSend);
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"Internal server error."});
}
}

module.exports=getRoadLinesControllers;