let express = require('express');
let router = express.Router();
let { processLeads } = require('../controllers/site');

/* POST /events */
router.post('/', processLeads);

module.exports = router;
