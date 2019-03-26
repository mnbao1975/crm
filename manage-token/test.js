const tokenUtils = require('./token_utils');

const getCRMToken = async () => {
  const token = await tokenUtils.getToken();
  console.log(token);
};

getCRMToken();