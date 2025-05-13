const getCurrentDateTime=require("../config/date.time.config")
const log = (data) => {
  try {
    const dataToPrintOnConsole={
        day:getCurrentDateTime().dayName,
        time:getCurrentDateTime().timeIn12HourFormat,
        date:getCurrentDateTime().dateFormateDDMMYYYY,
        timeStamps:Date.now(),
        message:data?.msg?data.msg:null,
        err:data?.err?data.err:null,
        data:data?.data?data.data:null,
        user:data?.user?data.user:null,
        token:data?.token?"token available ":null,
        status:data?.status?data.status:null
    }
    console.log(dataToPrintOnConsole)
  } catch (error) {
    console.log(error);
  }
};
module.exports = log;
