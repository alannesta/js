var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res) {
  res.render('polling');

});

router.get('/long', function(req, res) {
  // pending the request for 2s
  setTimeout(function() {
    res.status(200).send('ok');
  }, 2000);
});

router.get('/stream', function(req, res) {
  fs.createReadStream(path.join(__dirname, '../public/bower-components/jquery/dist/jquery.js'), {
      encoding: 'utf8',
      autoClose: true
  }).pipe(res);     // response header would be: Transfer-Encoding: chunked
});

router.get('/manual-stream', function(req, res) {

});

module.exports = router;
