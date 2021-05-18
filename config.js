import firebase from 'firebase';
require('@firebase/firestore')

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAOCDQMwwU0uqkJduRUpKD06hRcaidNJsY",
    authDomain: "booksanta-fcee7.firebaseapp.com",
    databaseURL: "https://booksanta-fcee7.firebaseio.com",
    projectId: "booksanta-fcee7",
    storageBucket: "booksanta-fcee7.appspot.com",
    messagingSenderId: "996295504976",
    appId: "1:996295504976:web:dac9907ee7d660f7ef4d55"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
