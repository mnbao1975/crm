1. index.js - Use google-spreadsheet package to work with spreadsheet. The KEY point is that you have the spreadsheet
has to share with the 'client_email' inside the credentials file when you enable Google Drive API.
Following this link:
https://www.twilio.com/blog/2017/03/google-spreadsheets-and-javascriptnode-js.html

2. index.-1.js - Use googleapis package to work with spreasheet is more flexible. We just authorize this app by visiting the generated link. And, get the code from that page to do authorize this app. Then, the app will create a token file for using next times.
https://developers.google.com/sheets/api/quickstart/nodejs#prerequisites
https://github.com/googleapis/google-api-nodejs-client/blob/master/samples/sheets/append.js


