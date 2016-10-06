var express = require('express');
var router = express.Router();
var user_service = require('../services/user_service');

router.get('/', user_service.index);      // show note json
router.get('/id/:id', user_service.getUserById);
router.get('/bySession', function(req, res){
  res.json(200, req.user);
});
router.get('/email/:email', user_service.getUserByEmail);
router.put('/', user_service.update);
router.delete('/:id', user_service.delete);

module.exports = router;
