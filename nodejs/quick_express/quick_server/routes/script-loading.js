var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

    res.render('script-loading');
});

router.get('/pending', function(req, res) {
    setTimeout(function() {
        res.status(200).send('ok');
    }, 1000);
});

module.exports = router;
