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

// When submit button is clicked, update the database
$("#submit-button").on("click", function () {
    // Prevent page reload
    event.preventDefault();
    // Variable used to discover empty text-fields
    var empty = false;
    // Check whether any text-fields are empty
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

    // Values used for calculating next train's arrival time
    var tFrequency = sVal.trainFreq;
    var firstTime = sVal.firstTrain;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var arrivalTime = moment(nextTrain).format("hh:mm");

    // Update Rows
    var row =
        "<tr>" +
        "<td>" + sVal.trainName + "</td>" +
        "<td>" + sVal.trainDst + "</td>" +
        "<td>" + sVal.trainFreq + "</td>" +
        "<td>" + arrivalTime + "</td>" + // first train arrival
        "<td>" + tMinutesTillTrain + "</td>" + // Minutes Away
        "</tr>";
    $("#train-data").append(row);

    // Empty text fields
    $("#add-train-name").val("");
    $("#add-destination-name").val("");
    $("#add-first-train-time").val("");
    $("#add-frequency-time").val("");
}

// Triggered via submit-button listener
function updateDb() {
    dbRef.push({
        trainName: $("#add-train-name").val().trim(),
        trainDst: $("#add-destination-name").val().trim(),
        trainFreq: $("#add-frequency-time").val().trim(), 
        firstTrain: $("#add-first-train-time").val().trim(),
    });
}