var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('aforum', { title: 'Express' });
});

module.exports = router;
