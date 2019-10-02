import firebase from 'firebase/app'
// Get the Firebase config from the auto generated file.
const firebaseConfig = {
    apiKey: "AIzaSyB0xlMpiN2m4w_BwbvpiOS5wb6Wi-NyE2E",
    authDomain: "super-tally.firebaseapp.com",
    databaseURL: "https://super-tally.firebaseio.com",
    projectId: "super-tally",
    storageBucket: "",
    messagingSenderId: "423764194949",
    appId: "1:423764194949:web:a42c406598f8c0b73c9bec"
}
// Instantiate a Firebase app.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase