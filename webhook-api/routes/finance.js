const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req);
  res.send('respond with a resource');
});

/**
 * POST /finance/do
*/
router.post('/do', (req, res) => {
  console.log(req.body);
  console.log(`====> ${req.body.payload}`);
  res.json({it: 'work'})
});
module.exports = router;
