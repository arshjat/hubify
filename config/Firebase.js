import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCLuj7GuGMZBvGdl9jIxoXy-QIEEDevuJg",
    authDomain: "proto-app-d4763.firebaseapp.com",
    databaseURL: "https://proto-app-d4763.firebaseio.com",
    projectId: "proto-app-d4763",
    storageBucket: "proto-app-d4763.appspot.com",
    messagingSenderId: "936519665482",
    appId: "1:936519665482:web:634bbbc4cd94c0286163b3",
    measurementId: "G-4VWEHGNP8V"
}

// Initialize Firebase
let Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase