const express=require('express');
const add_feature_collections_controller = require('../../../controllers/admin/featuresCollectionsData/addFeatureCollections/add_feature_collections_controller');
const get_feature_collections_controller = require('../../../controllers/admin/featuresCollectionsData/getFeatureCollection/get_feature_collections_controllers');
const add_feature_collections_file_data_controller = require('../../../controllers/admin/featuresCollectionsData/addFeatureCollections/add_feature_collections_file_data_controller');
const upload = require('../../../middleware/file/fileUpload');
const router=express.Router();

router.post('/add_feature_collection_data',add_feature_collections_controller);
router.post('/add_feature_collection_file_data',upload.single("jsonFile"), add_feature_collections_file_data_controller);
// router.post('/add_feature_collection_file_data',add_feature_collections_controller);
router.get('/get_feature_collection_data',get_feature_collections_controller);

module.exports=router;