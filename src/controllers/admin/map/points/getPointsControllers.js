const Point = require("../../../../models/point.model");
const log=require("../../../../utils/logger")
const getPointsControllers = async (req, res) => {
  try {
    const points = await Point.find();
    const dataToRes = {
      msg: "points fetched successfully.",
      data: points,
    };
    const logData={
      msg: "points fetched successfully.",
    }
    log(logData)
    res.status(200).json(dataToRes);
  } catch (error) {
    const logData={
      msg:error
    }
    log(logData)
    res.status(500).json({ msg: "Internal server error." });
  }
};

module.exports = getPointsControllers;
