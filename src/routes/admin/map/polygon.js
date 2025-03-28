const express=require('express');
const getPolygonControllers = require('../../../controllers/admin/map/polygon/getPolygonControllers');
const router=express.Router();
router.get('/get-all-polygons',getPolygonControllers);
module.exports=router;