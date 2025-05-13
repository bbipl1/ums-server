const mobileNumberRegex = require("../regex/phone/mobileNumberRegex");

const isValidMobileNo=(mobileNo)=>{
    const cleanMobileNo=String(mobileNo).trim().replace(/^0+/,"")
    const pattern=mobileNumberRegex();
    return pattern.test(String(cleanMobileNo));
}

module.exports=isValidMobileNo;