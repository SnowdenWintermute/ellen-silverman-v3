const admin = require('firebase-admin')

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ellen-silverman.firebaseapp.com",
  databaseURL: "https://ellen-silverman.firebaseio.com",
  projectId: "ellen-silverman",
  storageBucket: "ellen-silverman.appspot.com",
  messagingSenderId: "1039971504775",
  appId: "1:1039971504775:web:b8448a402af425300e9e22"
};
// Initialize Firebase
admin.initializeApp(firebaseConfig);

module.exports = admin
