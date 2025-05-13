const gmailRegex=()=>{
    const regexPattern=/^(?!.*\.\.)(?!\.)(?!.*\.$)[A-Za-z0-9]+(?:\.[A-Za-z0-9]+)*@gmail\.com$/;
    return regexPattern;
}
module.exports=gmailRegex;