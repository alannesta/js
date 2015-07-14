var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('polling');

});

router.get('/long', function(req, res) {
  // pending the request for 2s
  setTimeout(function() {
    res.status(200).send('ok');
  }, 2000);
});

module.exports = router;
