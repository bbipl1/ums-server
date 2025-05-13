const bcrypt=require("bcrypt");
const compareString=async(hashedString,string)=>{
    const isMatched=bcrypt.compare(hashedString,string);
    return isMatched;
}

module.exports=compareString;