var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TPNStwo' });
});
/* GET video microsite page. */
router.get('/video', function(req, res, next) {
  res.render('video', { title: 'TPNSvideo' });
});
module.exports = router;
