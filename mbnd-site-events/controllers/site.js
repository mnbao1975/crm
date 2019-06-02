let site = require('../services/site');

function processLeads(req, res, next) {
  switch (req.body.event) {
    case 'SiteLeadCreated':
      site.createLead(req.body.payload.leads);
      res.json({ it: 'works', token_key: process.env.SERVICE_TOKEN_KEY });
      break;
    default:
      res.json({ say: 'nothing todo'} );
      console.log('nothing to do');
  }

}

module.exports = {
  processLeads,
}