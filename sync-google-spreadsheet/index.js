const GoogleSpreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json');

// Create a document object using the ID of the spreadsheet - obtained from its URL.
// E.g. https://docs.google.com/spreadsheets/d/1fRbUWaUCmSo64a3ciUkpZajG7aOcUx6GZ6NrIkPqi9o/edit#gid=0
const doc = new GoogleSpreadsheet('1fRbUWaUCmSo64a3ciUkpZajG7aOcUx6GZ6NrIkPqi9o');

// Authenticate with the Google Spreadsheets API.
doc.useServiceAccountAuth(creds, function (err) {

  // Get all of the rows from the FIRST spreadsheet (number 1).
  doc.getRows(1, function (err, rows) {
    console.log(rows.length);
    console.log(rows[0]['col2']);
  });
});