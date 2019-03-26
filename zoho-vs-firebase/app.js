const firebase = require('firebase-admin');
const config = require('dotenv').config();
const serviceAccount = require("./serviceAccountKey.json");

if (config.error) {
  throw config.error;
}

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});

const db = firebase.database();
const ref = db.ref('/DO-Invoice-Debt');
//const ref = db.ref('/Sheet1');
let initialDataLoaded = false;
/**
 * This function must be registered inside ref.once('value') 
 * in order to handle keeping the existing data for the first time.
 */
function registerChildAdd() {
  ref.on('child_added', snapshot => {
    if(initialDataLoaded) {
      console.log('initialDataLoaded child_added');        
      return;
    }
    console.log('child_added');  
    console.log(snapshot.val());    
  });
}
/**
 * Register events and start listener data change
 */
function startListeners() {
  ref.on('child_changed', snapshot => {
    console.log('child_changed');
    //console.log(snapshot.val());
  });

  // Register event types which will ignor the existing data before
  ref.once('value', snapshot => {
    initialDataLoaded = true;
    registerChildAdd();
    initialDataLoaded = false;
    console.log('Initalized data loaded');
  });
  
  console.log('Started...');  
}


startListeners();