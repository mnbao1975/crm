const axios = require('axios');
const config = require('dotenv').config();
const tokenUtils = require('./token_utils');

if (config.error) {
  throw config.error;
}
/**
 * Call Zoho CRM API to get records. The url containing the api name such as invoices.
 * This API could be used for search record(s) also.
 * @param {string} url 
 * @param {obj} headers 
 * @param {obj} params 
 */
const getRecords = async (url, headers, params={}) => {
  try {
    return await axios({
      method: 'get',
      url,
      params,
      headers
    });
  } catch (error) {
    throw error;
  }  
}
/**
 * Example for getting invoices
 * @param {string} oauthtoken 
 */
const getInvoices = async (oauthtoken) => {  
  try {
    const url = `${process.env.API_URL}/invoices`;
    const headers = {'Authorization': `Zoho-oauthtoken ${oauthtoken}`};
    const res = await getRecords(url, headers);
    if(res) {
      console.log(res.data);
    }  
  } catch (error) {
    // Get refresh token
    if (error.response.data.code && error.response.data.code === 'INVALID_TOKEN') {
      console.log(error.message);
      const objToken = await tokenUtils.getRefreshToken();
      console.log(`New Token: ${objToken.data.access_token}`);
      getInvoices(objToken.data.access_token);
    }
  }
};
/**
 * Example for searching invoices with criteria in the params
 * @param {string} oauthtoken 
 */
const searchInvoices = async (oauthtoken) => {
  try {
    const url = `${process.env.API_URL}/invoices`;
    const headers = { Authorization: `Zoho-oauthtoken ${oauthtoken}`};
    const params = { criteria: '(Modified_By.id:equals:3829742000000197425)'};
    const res = await getRecords(url, headers, params);
    if(res) {
      console.log(res.data);
    }  
  } catch (error) {
    // Get refresh token
    if (error.response.data.code && error.response.data.code === 'INVALID_TOKEN') {
      console.log(error.message);
      const objToken = await tokenUtils.getRefreshToken();
      console.log(`New Token: ${objToken.data.access_token}`);
      getInvoices(objToken.data.access_token);
    }
  }
};

//getInvoices('1000.724b31ffc4bea14f5d891bae6d51dc8e.0e509496b62427dca7fa68bf5c7f2aab');
searchInvoices('1000.724b31ffc4bea14f5d891bae6d51dc8e.0e509496b62427dca7fa68bf5c7f2aab');