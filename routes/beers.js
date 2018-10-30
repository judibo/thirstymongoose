var express = require('express');
var router = express.Router();
var beersCtrl = require('../controllers/beers')

/* GET users listing. */
router.get('/', beersCtrl.index);
router.get('/new', beersCtrl.new);
router.get('/:id', beersCtrl.show);
router.post('/', beersCtrl.create);
router.delete('/:id', beersCtrl.delete);
router.post('/:id/comments', beersCtrl.createComment);

module.exports = router;
