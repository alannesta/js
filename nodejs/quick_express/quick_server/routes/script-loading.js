var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    //setTimeout(function() {
    //    res.status(200).send('ok');
    //}, 2000);
    res.render('script-loading');
});


module.exports = router;
