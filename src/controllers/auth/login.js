const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const log = require("../../utils/logger");
const sendResponse = require("../../utils/sendResponse");
const compareString = require("../../utils/bcrypt/compareString");
const userLoginControllers = async (req, res) => {
  try {
    const secret = process.env.JWT_SECRET;

    let { email, mobile, password } = req.body;
    email = email?.trim();
    mobile = mobile?.trim();
    password = password?.trim();

    let resData = {
      msg: null,
      data: [],
    };

    if (!email && !mobile) {
      resData.msg = "email or mobile number is required.";
      sendResponse(res, 400, resData);
    }

    if (!password) {
      resData.msg = "password is required.";
      sendResponse(res, 400, resData);
    }

    let user = null;
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ mobile });
    }

    if (!user) {
      resData.msg = "User not found.";
      resData.data = [];
      return sendResponse(res, 404, resData);
    }

    const userHashedPassword = user?.password;

    if (user && !compareString(userHashedPassword, password)) {
      resData.msg = "Incorrect password";
      resData.data = [];
      return sendResponse(res, 401, resData);
    }

    const payload = {
      name: user?.name.middleName
        ? user?.name?.firstName +
          " " +
          user?.name?.middleName +
          " " +
          user?.name?.lastName
        : user?.name?.firstName + " " + user?.name?.lastName,
      email: user?.email,
      mobile: user?.mobile?.countryCode + user?.mobile?.mobileNumber,
      role: user?.role,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "2h" });

    const dataToSendTouser = {
      user: {
        firstName: user?.name?.firstName,
        fullName: payload.name,
        email: user?.email,
        mobile: payload.mobile,
        role: user?.role,
      },
      token
    };
    resData.msg = "Login success.";
    resData.data = dataToSendTouser;
    resData.status=200;
    const logData={
      msg:resData.msg,
      data:[],
      user:dataToSendTouser?.user,
      token,
      status:200
    }
    log(logData)
    return sendResponse(res, 200, resData);
  } catch (error) {
    const logData = {
      err:error,
      mobile:mobile?.countryCode+mobile.mobileNumber,
      email:email,
    };

    log(logData);
    const resData = {
      err: "Internal server error",
      data: [],
      status:500
    };
    return sendResponse(res, 500, resData);
  }
};

module.exports = userLoginControllers;
