const tokenUtils = require('./token_utils');

async function createLead(leads) {
  const oauthtoken = await tokenUtils.getToken();
  console.log(oauthtoken);
}

module.exports = {
  createLead,
}