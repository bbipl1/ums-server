const express=require('express');
const getRoadLinesControllers = require('../../../controllers/admin/map/roadLines/getRoadLinesControllers');
const router=express.Router();
router.get('/get-all-road-lines',getRoadLinesControllers);
module.exports=router;