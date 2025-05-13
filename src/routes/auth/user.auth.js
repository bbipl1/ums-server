const express=require("express");
const userSignInController = require("../../controllers/auth/signIn");
const userLoginControllers = require("../../controllers/auth/login");


const router=express.Router();

router.post('/user/sign-in',userSignInController);
router.post("/user/login",userLoginControllers)


module.exports=router;