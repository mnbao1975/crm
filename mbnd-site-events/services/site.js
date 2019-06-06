/**
 * Site service will handle leads create from MBND website which was sent to this API as an event
 */
const axios = require('axios');
const tokenUtils = require('./token_utils');

/**
 * Call Zoho CRM API to create a record. The url containing the api name such as Lead for creating a new lead.
 * @param {string} url 
 * @param {obj} headers 
 * @param {obj} params 
 * @param {obj} data 
 */
async function postRecord(url, headers, params={}, data={}) {
  try {
    return await axios({
      method: 'post',
      url,
      params,
      headers,
      data
    });
  } catch (error) {    
    throw error;
  }  
}
/**
 * Create a new lead with note
 * @param {array} leads 
 */
async function createLead(leads) {
  try {
    const leadEvent = leads[0];
    const message = leadEvent.messages[0];
    const leadData = {
      data: [{
        Company: leadEvent.user.name,
        Last_Name: leadEvent.user.name,
        Email: leadEvent.user.email,      
        Phone: '09098448241'
      }]
    };
    const oauthtoken = await tokenUtils.getToken();    
    const headers = {'Authorization': `Zoho-oauthtoken ${oauthtoken}`};
    console.log(`oauthtoken: ${oauthtoken}`);  
    const url = `${process.env.API_URL}/leads`;

    const resLead = await postRecord(url, headers, {}, leadData);
    const resNote = await createNote(resLead.data.data[0].details.id, leadEvent);
    return resLead.data;    
  } catch (error) {
    //console.log(error);
    throw new Error('Cannot create a lead');
  }
}
/**
 * This function will take a keypath embeded inside the note content and replace it with appropriate info of user.
 * Ex: The pattern could be a string of '{user.name}'
 * @param {obj} leadEvent - the lead data sent to the app as event
 * @param {string} noteContent 
 */
function buildNoteContent(leadEvent, noteContent) {
  const matchArr = noteContent.match(/\{(.+)\}/);
  // Nothing todo
  if(!matchArr) {
    return new Promise((resolve, reject) => {
      resolve(noteContent);
    });
  }

  const keyPath = matchArr[1];
  const result = keyPath.split('.').reduce((previous, current) => {
    return previous[current];
  }, leadEvent);  
  
  return new Promise((resolve, reject) => {
    resolve(noteContent.replace(/\{(.+)\}/g, result));
  });
}
/**
 * Create a note and add it to a lead
 * @param {string} leadID - a new lead was added into Zoho system
 * @param {object} leadEvent - lead data object was sent to the app as an event
 */
async function createNote(leadID, leadEvent) {
  try {
    const oauthtoken = await tokenUtils.getToken();
    const headers = {'Authorization': `Zoho-oauthtoken ${oauthtoken}`};
    const url = `${process.env.API_URL}/Leads/${leadID}/Notes`;
    
    const messageObj = leadEvent.messages[0];
    const newNoteContent = await buildNoteContent(leadEvent, messageObj.content);    

    const noteData = {
      data: [{
        Note_Title: messageObj.subject,
        Note_Content: newNoteContent
      }]
    };
    const res = await postRecord(url, headers, {}, noteData);  
  } catch (error) {
    //console.log(error);
    throw new Error(`Cannot create a note for lead ${leadID}`);
  }
}

module.exports = {
  createLead,
}