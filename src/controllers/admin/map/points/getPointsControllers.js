const Point = require("../../../../models/point.model");
const getPointsControllers = async (req, res) => {
  try {
    const points = await Point.find();
    const dataToRes = {
      msg: "points fetched successfully.",
      data: points,
    };
    res.status(200).json(dataToRes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error." });
  }
};

module.exports = getPointsControllers;
