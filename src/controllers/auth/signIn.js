const log = require("../../utils/logger");
const User = require("../../models/user.model");
const sendResponse = require("../../utils/sendResponse");
const hashString = require("../../utils/bcrypt/hashString");
const isValidMobileNo = require("../../utils/mobile/isValidMobileNo");
const isValidCountryCode = require("../../utils/mobile/isValidCountryCode");
const isValidGmail = require("../../utils/email/isValidGmail");
const isValidPassword = require("../../utils/password/isValidPassword");
const firstNameRegex = require("../../utils/regex/name/firstNameRegex");
const middleNameRegex = require("../../utils/regex/name/middleNameRegex");
const lastNameRegex = require("../../utils/regex/name/lastNameRegex");

const userSignInController = async (req, res) => {
  let resData = {
    msg: null,
    data: [],
  };

  try {
    let { name, password, gender, mobile, role, email } = req.body;
    name.firstName = name?.firstName?.trim();
    name.middleName = name?.middleName?.trim();
    name.lastName = name?.lastName?.trim();
    password = password?.trim();
    gender = gender?.trim();
    mobile.countryCode = mobile?.countryCode?.trim();
    mobile.mobileNumber = mobile?.mobileNumber?.trim();
    email = email?.trim();
    role = role?.trim();

    if (
      !name ||
      !password ||
      !gender ||
      !mobile.countryCode ||
      !mobile.mobileNumber ||
      !email ||
      !role
    ) {
      resData.err = "All fields are required.";
      resData.data = [];
      resData.status = 401;

      return sendResponse(res, 401, resData);
    }

    if (!name?.firstName) {
      resData.err = "FirstName is required.";
      resData.data = [];
      resData.status = 401;

      return sendResponse(res, 401, resData);
    }

    if (!name?.lastName) {
      resData.err = "LastName is required.";
      resData.data = [];
      resData.status = 401;

      return sendResponse(res, 401, resData);
    }

    const  firstNamePattern = firstNameRegex();
    let isValid = firstNamePattern.test(name?.firstName);
    if (!isValid) {
      resData.err = "Special character or number is not allowed in firstName";
      resData.data = [];
      resData.status = 401;

      return sendResponse(res, 401, resData);
    }

    const middleNamePattern=middleNameRegex();

    if (name?.middleName) {
      isValid = middleNamePattern.test(name?.middleName);

      if (!isValid) {
        resData.err =
          "Special character or number is not allowed in middleName";
        resData.data = [];
        resData.status = 401;

        return sendResponse(res, 401, resData);
      }
    }

    const lastNamePattern=lastNameRegex();

    isValid = lastNamePattern.test(name?.lastName);

    if (!isValid) {
      resData.err = "Special character or number is not allowed in lastName";
      resData.data = [];
      resData.status = 401;

      return sendResponse(res, 401, resData);
    }

    //validate mobile number start
    if (!isValidMobileNo(String(mobile.mobileNumber))) {
      resData.err = "Mobile number is not valid.";
      resData.data = [];
      resData.status = 401;
      return sendResponse(res, 401, resData);
    }
    //validate mobile number end
    //validate country code start
    if(!isValidCountryCode(String(mobile?.countryCode))){
      resData.err = "Country code is not valid.";
      resData.data = [];
      resData.status = 401;
      return sendResponse(res, 401, resData);
    }
    //validate country code end

    // validate gmail start
    if(!isValidGmail(String(email))){
      resData.err = "Email is not valid.";
      resData.data = [];
      resData.status = 401;
      return sendResponse(res, 401, resData);
    }
    // validate gmail end

    //validate password start
    const passwordRes=isValidPassword(String(password));
    // console.log(passwordRes)
    if(!passwordRes.isValid){
      resData.err = passwordRes.err;
      resData.data = [];
      resData.status = 401;
      return sendResponse(res, 401, resData);
    }
    //validate password end

    let duplicateUser = null;
    //check for duplicate user
    if (mobile) {
      duplicateUser = await User.findOne({ mobile });
      if (duplicateUser) {
        resData.err =
          "User already exist with mobile No: " +
          String(mobile.countryCode) +
          String(mobile.mobileNumber);
        resData.data = [];
        return sendResponse(res, 409, resData);
      }
    }
    if (email) {
      duplicateUser = await User.findOne({ email });
      if (duplicateUser) {
        resData.err = "User already exist with email: " + String(email);
        resData.data = [];
        return sendResponse(res, 409, resData);
      }
    }

    const encryptedPassword = await hashString(password);

    const payload = {
      name,
      mobile,
      email,
      gender,
      role,
      password: encryptedPassword,
    };

    const newUser = new User(payload);
    const saveRes = await newUser.save();
    // console.log(saveRes);
    resData.msg = "SignIn success.";
    resData.status = 200;
    let userName = null;
    if (name.middleName) {
      userName =
        saveRes.name.firstName +
        " " +
        saveRes.name.middleName +
        " " +
        saveRes.name.lastName;
    } else {
      userName = saveRes.name.firstName + " " + saveRes.name.lastName;
    }
    const dataTosendTouser = {
      Name: userName,
      Mobile: saveRes.mobile.countryCode + saveRes.mobile.mobileNumber,
      Gender: saveRes.gender,
      Email: saveRes.email,
      Password: password,
    };

    resData.data = dataTosendTouser;

    const logData={
      msg:"signIn success",
      status:200,
      user:dataTosendTouser,
    }
    log(logData)

    return sendResponse(res, 200, resData);
  } catch (error) {
    const logData = {
      "err": error,
      "status": 500,
    };
  

    log(logData);
    resData.err = "Internal server error.";
    resData.data = [];
    resData.status = 500;
    return sendResponse(res, 500, resData);
  }
};

module.exports = userSignInController;
