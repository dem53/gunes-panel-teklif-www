var express = require('express');
var router = express.Router();

router.get('/vorteile', function(req, res, next) {
  res.render('vorteile', { title: 'Express' });
});

module.exports = router;
