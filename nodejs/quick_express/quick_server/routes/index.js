var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/report', function(req, res) {
  console.log(req.body);
  res.status(200).send('got it');
});


module.exports = router;
