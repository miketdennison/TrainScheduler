// Configuration for database
var firebaseConfig = {
    apiKey: "AIzaSyCwQQC3Rw9chSg9umwogDSMPPScycdRbEo",
    authDomain: "trainscheduler-3818d.firebaseapp.com",
    databaseURL: "https://trainscheduler-3818d.firebaseio.com",
    projectId: "trainscheduler-3818d",
    storageBucket: "trainscheduler-3818d.appspot.com",
    messagingSenderId: "233016200919",
    appId: "1:233016200919:web:dfda1992f6b706d2"
};

// Initialize Firebase database with config
firebase.initializeApp(firebaseConfig);

// Reference to Firebase database
var database = firebase.database();