/**
 * Based on the event, this controller will use a specific service to process that event
 * 
 */
let site = require('../services/site');

async function processLeads(req, res, next) {
  switch (req.body.event) {
    case 'SiteLeadCreated':
      try {
        const lead = await site.createLead(req.body.payload.leads);
        res.json(lead);                
      } catch (error) {
        console.log(error);
        res.status(501).json({ message: error.message });
      }
      break;
    default:
      res.json({ say: 'nothing todo'} );
  }
}

module.exports = {
  processLeads,
}