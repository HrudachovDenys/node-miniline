const express = require('express');

const Controllers = require('../controllers');
const Middlewares = require('../middlewares');
const Utilities = require('../utilities');

const WrapperUtility = Utilities.WrapperUtility;
const wrap = WrapperUtility.handle;

const router = express.Router();

module.exports = router;