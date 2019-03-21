var express = require('express');
var router = express.Router();
var ZCRMRestClient = require('zcrmsdk');

/* GET users listing. */
router.get('/', (req, res) => {
  console.log(req);
  res.send('respond with a resource');
});

module.exports = router;
