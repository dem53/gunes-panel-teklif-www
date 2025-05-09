var express = require('express');
var router = express.Router();

router.get('/ratgeber', function(req, res, next) {
    res.render('ratgeber', { title: 'Express' });
  });
  
  module.exports = router;
  

