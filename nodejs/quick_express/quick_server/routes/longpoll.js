var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  //res.send('respond with a resource');
  //res.set({
  //  'Content-Type': 'text/plain',
  //  'Transfer-Endcoding': 'chunked'
  //});
  res.render('polling');

});

module.exports = router;
