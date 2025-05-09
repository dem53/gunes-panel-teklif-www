var express = require('express');
var router = express.Router();

router.get('/produkte', function(req, res, next) {
  res.render('produkte', { title: 'Express' });
});

module.exports = router;
