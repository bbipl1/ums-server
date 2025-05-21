const express = require("express");
const cors=require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./src/config/db.config");
const app = express();
const PORT = process.env.PORT;
const log=require("./src/utils/logger")

// const getCurrentDateTime=require("./src/config/date.time.config")
// console.log(getCurrentDateTime())

// route import start
const point=require('./src/routes/admin/map/point')
const roadLine=require('./src/routes/admin/map/roadLines')
const polygon=require('./src/routes/admin/map/polygon');
const manage_data=require('./src/routes/admin/data/data_routes');

const useAuthMiddleware = require("./src/middleware/auth/userAuth");
const userAuth=require("./src/routes/auth/user.auth");
const useLoginRateLimiter = require("./src/middleware/auth/useLoginRateLimiter");

// route import end

// middleware start
// default middleware start
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// default middleware end
// customMiddleWare start
app.use('/api/v1/viewer',useAuthMiddleware)
// app.use('/api/v1/admin',useAuthMiddleware)
// customMiddleware end
// auth start here
app.use('/api/v1/auth',useLoginRateLimiter,userAuth)
// auth start end

app.use('/api/v1/admin/map/point',useLoginRateLimiter,point);
app.use('/api/v1/admin/map/road-line',roadLine);
app.use('/api/v1/admin/map/polygon',polygon);
app.use('/api/v1/admin/data/manage_data',manage_data);
// middleware end

app.get('/', (req, res) => {
  res.send('🚀 Welcome to your API! server is working.');
});

const startApp = async() => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server is running on port: ", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
startApp();
