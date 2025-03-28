const Polygon=require("../../../../models/polygon.model");
const getPolygonControllers=async(req,res)=>{
try {
    const polygons=await Polygon.find();
    const dataToSend={
        msg:"polygon fetched successfully.",
        data:polygons
    }

    res.status(200).json({dataToSend});
} catch (error) {
    console.log(error)
    res.status(500).json({msg:"Internal server error."})
}
}
module.exports=getPolygonControllers;