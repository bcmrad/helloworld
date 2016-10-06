var express = require('express');
var router = express.Router();
var user_service = require('../services/user_service');

router.post('/', user_service.create);

module.exports = router;