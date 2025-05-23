const express=require('express');
const add_feature_collections_controller = require('../../../controllers/admin/featuresCollectionsData/addFeatureCollections/add_feature_collections_controller');
const get_feature_collections_controller = require('../../../controllers/admin/featuresCollectionsData/getFeatureCollection/get_feature_collections_controllers');
const router=express.Router();

router.post('/add_feature_collection_data',add_feature_collections_controller);
router.get('/get_feature_collection_data',get_feature_collections_controller);

module.exports=router;