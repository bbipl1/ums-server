const passwordRegex = require("../regex/password/passwordRegex");

const isValidPassword = (pass) => {
  try {
    const trimedPassword=String(pass).trim();
    const regexPattern=passwordRegex();
    // console.log(trimedPassword)
    // console.log(regexPattern)
    const isPasswordFollowRegex=regexPattern.test(trimedPassword)
    if(isPasswordFollowRegex){

      if(trimedPassword.length<6){
        const res={
          msg:null,
          status:"failed",
          err:"password is too short.",
          isValid:false
        }
        return res;
      }
      if(trimedPassword.length>18){
        const res={
          msg:null,
          status:"failed",
          err:"password is too long.",
          isValid:false
        }
        return res;
      }
      const res={
        msg:"password is valid.",
        status:"ok",
        err:null,
        isValid:true
      }
      return res;
    }else{
      const res={
        msg:null,
        status:"failed",
        err:"Invalid password",
        isValid:false
      }
      return res;
    }
    // return regexPattern.test(trimedPassword)
  } catch (error) {
    const res={
      msg:null,
      status:"failed",
      err:"Unknown error occured.",
      isValid:false
    }
    return res;
  }
};
module.exports = isValidPassword;
