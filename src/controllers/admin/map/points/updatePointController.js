const Point = require("../../../../models/point.model");
const updatePointController = async (req, res) => {
  try {
    const { id, newData } = req.body;
    const options = { upsert: true, new: true };
    const response = await Point.findByIdAndUpdate(id, newData, options);

    if (response) {
      return res
        .status(200)
        .json({
          status: "ok",
          msg: "Point updated successfully.",
          data: response,
        });
    } else {
      return res
        .status(500)
        .json({ status: "failed", msg: "Point updation failed.", data: {} });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", msg: "Internal server error.", data: {} });
  }
};

module.exports=updatePoint;
