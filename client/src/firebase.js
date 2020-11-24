import firebase from 'firebase'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "ellen-silverman.firebaseapp.com",
  databaseURL: "https://ellen-silverman.firebaseio.com",
  projectId: "ellen-silverman",
  storageBucket: "ellen-silverman.appspot.com",
  messagingSenderId: "1039971504775",
  appId: "1:1039971504775:web:b8448a402af425300e9e22"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()