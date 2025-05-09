var express = require('express');
var router = express.Router();

router.get('/anfrage', function(req, res, next) {
  res.render('anfrage', { title: 'Express' });
});

module.exports = router;
