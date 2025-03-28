const express=require('express');
const getPointsControllers = require('../../../controllers/admin/map/points/getPointsControllers');
const router=express.Router();
router.get('/get-all-points',getPointsControllers);
module.exports=router;