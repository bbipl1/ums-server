const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./src/config/db.config");
const app = express();
const PORT = process.env.PORT;
// route import start
const point=require('./src/routes/admin/map/point')
const roadLine=require('./src/routes/admin/map/roadLines')
const polygon=require('./src/routes/admin/map/polygon')
// route import end

// middleware start
app.use('/api/v1/admin/map/point',point);
app.use('/api/v1/admin/map/point',roadLine);
app.use('/api/v1/admin/map/point',polygon);
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
  } catch (error) {}
};
startApp();
