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
async function getRecords(url, headers, params={}) {
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
 * Example for getting deals
 * @param {string} oauthtoken 
 */
async function getDeals(dealId='') {  
  try {
    const oauthtoken = await tokenUtils.getToken();
    const url = `${process.env.API_URL}/deals/${dealId}`;
    const headers = {'Authorization': `Zoho-oauthtoken ${oauthtoken}`};
    
    const res = await getRecords(url, headers);
    if(res) {
      console.log(res.data);
    }  
  } catch (error) {
    console.log(error);
  }
};
/**
 * Example for getting leads
 * @param {string} oauthtoken 
 */
async function getLeads() {  
  try {
    const oauthtoken = await tokenUtils.getToken();
    console.log(`oauthtoken: ${oauthtoken}`);
    const url = `${process.env.API_URL}/leads`;
    const headers = {'Authorization': `Zoho-oauthtoken ${oauthtoken}`};
    
    const res = await getRecords(url, headers);
    if(res) {
      console.log(res.data.data);
    }  
  } catch (error) {
    console.log(error);
  }
};
/**
 * Example for getting invoices
 * @param {string} oauthtoken 
 */
async function getInvoices() {  
  try {
    const oauthtoken = await tokenUtils.getToken();
    const url = `${process.env.API_URL}/invoices`;
    const headers = {'Authorization': `Zoho-oauthtoken ${oauthtoken}`};
    
    const res = await getRecords(url, headers);
    if(res) {
      console.log(res.data.data[0]);
    }  
  } catch (error) {
    console.log(error);
  }
};
/**
 * Example for searching invoices with criteria in the params
 * @param {string} oauthtoken 
 */
async function searchInvoices(invoiceNumber) {
  try {
    const oauthtoken = await tokenUtils.getToken();
    const url = `${process.env.API_URL}/invoices/search`;
    const headers = { Authorization: `Zoho-oauthtoken ${oauthtoken}`};
    const params = { criteria: '(Modified_By.id:equals:3829742000000197425)'};
    const res = await getRecords(url, headers, params);
    if(res) {
      console.log(res.data);
    }  
  } catch (error) {
    console.log(error);
  }
};


getLeads();
//getDeals('3894800000000217040');
//getInvoices();
//searchInvoices('3894800000000217371');
