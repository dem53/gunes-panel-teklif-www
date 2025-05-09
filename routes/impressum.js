var express = require('express');
var router = express.Router();


router.get('/impressum', function(req, res, next) {
    res.render('impressum', { title: 'Express' });
  });
  
  module.exports = router;
  

