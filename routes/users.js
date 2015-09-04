var express = require('express');
var router = express.Router();
var user_service = require('../services/user_service');

router.get('/', user_service.index);      // show note json
router.get('/:id', user_service.getUser);
router.post('/', user_service.create);
router.put('/', user_service.update);
router.delete('/:id', user_service.delete);

module.exports = router;
