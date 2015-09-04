var express = require('express');
var router = express.Router();
var note_service = require('../services/note_service');

router.get('/', note_service.index);      // show note json
router.get('/:id', note_service.getNote);
router.post('/', note_service.create);
router.put('/', note_service.update);
router.put('/vote', note_service.vote);
router.delete('/:id', note_service.delete);

module.exports = router;
