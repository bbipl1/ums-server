const sendResponse = (res, statusCode = 200, data = {}, headers = {}) => {
    // Set default headers if any
    res.set(headers);
  
    // Send response
    return res.status(statusCode).json(data);
  };
  
  module.exports = sendResponse;
  