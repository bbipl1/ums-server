const bcrypt=require("bcrypt");
const hashString=async(string)=>{
    const hashedString=bcrypt.hash(string,15);
    return hashedString;
}

module.exports=hashString;