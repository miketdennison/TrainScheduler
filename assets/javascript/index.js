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

// Reference to Firebase database & Root
var database = firebase.database();
var dbRef = database.ref();

// If a child is modified, update the view
dbRef.on("child_added", snapshot => updateView(snapshot));
dbRef.on("child_changed", snapshot => updateView(snapshot));
dbRef.on("child_removed", snapshot => updateView(snapshot));

// When submit button is clicked, update the database
$("#submit-button").on("click", function () {
    var empty = false;
    $(":text").each(function () {
        if ($(this).val() === "") {
            empty = true;
        }
    });
    // If all text field are non-empty, verify frequency data and time data
    if (!empty) {
        var frequencyTime = $("#add-frequency-time").val();
        if (!isNaN(parseInt(frequencyTime))) {
            updateDb();
        }
    }
});

// Trigged via listners for child modifications
function updateView(snapshot) {
    var sVal = snapshot.val();
    var row =
        "<tr>" +
        "<td>" + sVal.trainName + "</td>" +
        "<td>" + sVal.trainDst + "</td>" +
        "<td>" + sVal.trainFreq + "</td>" +
        "<td>" + sVal.firstTrain + "</td>" +
        "<td>" + sVal.minutesAway + "</td>" +
        "</tr>";
    $("#train-data").append(row);

    $("#add-train-name").text('');
    $("#add-destination-name").text('');
    $("#add-first-train-time").text('');
    $("#add-frequency-time").text('');
}

// Triggered via submit-button listener
function updateDb() {
    dbRef.push({
        trainName: $("#add-train-name").val(),
        trainDst: $("#add-destination-name").val(),
        firstTrain: $("#add-frequency-time").val(),
        trainFreq: $("#add-first-train-time").val(),
    });
}