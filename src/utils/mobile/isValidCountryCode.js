const countryCodeRegex = require("../regex/phone/countryCodeRegex");

const isValidCountryCode=(cc)=>{
    const cleanCode=String(cc).trim().replace(/^0+/,"")
    const pattern=countryCodeRegex();
    return pattern.test(String(cleanCode))
}

module.exports=isValidCountryCode;