const sendResponse = (res, statusCode = 200, data = {}, headers = {}) => {
  if (!res || typeof res.set !== 'function') {
    console.error("sendResponse: Invalid 'res' object passed", res);
    throw new Error("Invalid response object passed to sendResponse");
  }

  res.set(headers);
  return res.status(statusCode).json(data);
};
module.exports=sendResponse;