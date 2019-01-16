const express = require('express');
const router = express.Router();
const Utilities = require('../utilities');
const WrapperUtility = Utilities.WrapperUtility;
const wrap = WrapperUtility.handle;
const { ApiController } = require("../controllers");

router.post('/auth/login', wrap(ApiController.LoginAction)); 
router.post('/auth/registration', wrap(ApiController.RegistrationAction)); 
router.post('/auth/verification', wrap(ApiController.VerificationTokenAction)); 

module.exports = router;