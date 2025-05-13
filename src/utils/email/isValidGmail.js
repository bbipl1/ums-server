const gmailRegex = require("../regex/email/gmailRegex");

const isValidGmail=(gmail)=>{
    try {
        const cleanGmail=String(gmail).trim();
        const pattern=gmailRegex();
        return pattern.test(cleanGmail);
        
    } catch (error) {
        return false;
    }
}

module.exports=isValidGmail;