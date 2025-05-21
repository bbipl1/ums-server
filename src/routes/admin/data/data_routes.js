const express=require("express");
const add_country_data_details_controller = require("../../../controllers/admin/data/addDetails/add_country_data_details_controler");
const add_state_data_details_controller = require("../../../controllers/admin/data/addDetails/add_state_data_details_controler");
const add_district_data_details_controller = require("../../../controllers/admin/data/addDetails/add_district_data_details_controler");
const add_sub_district_data_details_controller = require("../../../controllers/admin/data/addDetails/add_sub_district_data_details_controler");
const add_village_town_data_details_controller = require("../../../controllers/admin/data/addDetails/add_village_town_data_details_controler");
const get_country_details_controller = require("../../../controllers/admin/data/getDetails/get_country_details_controller");
const get_state_details_controller = require("../../../controllers/admin/data/getDetails/get_state_details_controller");
const get_district_details_controller = require("../../../controllers/admin/data/getDetails/get_district_details_controller");
const get_sub_district_details_controller = require("../../../controllers/admin/data/getDetails/get_sub_district_details_controller");
const get_village_town_details_controller = require("../../../controllers/admin/data/getDetails/get_village_town_details_controller");
const get_all_data_controller = require("../../../controllers/admin/data/getDetails/get_all_data_controller");
const router=express.Router();

console.log("router")
router.post("/add_country_details",add_country_data_details_controller);
router.post("/add_state_details",add_state_data_details_controller);
router.post("/add_district_details",add_district_data_details_controller);
router.post("/add_sub_district_details",add_sub_district_data_details_controller);
router.post("/add_village_town_details",add_village_town_data_details_controller);

router.get("/get_country_details",get_country_details_controller);
router.get("/get_state_details",get_state_details_controller);
router.get("/get_district_details",get_district_details_controller);
router.get("/get_sub_district_details",get_sub_district_details_controller);
router.get("/get_village_town_details",get_village_town_details_controller);
router.get("/get_all_data_details",get_all_data_controller);

module.exports=router;