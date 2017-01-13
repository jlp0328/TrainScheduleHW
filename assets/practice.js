  // Initialize Firebase
var config = {
    apiKey: "AIzaSyA-FCfLYDFh1aDUnHv0W_XBwgnb8eioGv4",
    authDomain: "trainschedulehw.firebaseapp.com",
    databaseURL: "https://trainschedulehw.firebaseio.com",
    storageBucket: "trainschedulehw.appspot.com",
    messagingSenderId: "712147932687"
};

firebase.initializeApp(config);

var database = firebase.database();

var postData;

//GLOBAL VARIABLES
var trainName;
var destination;
var firstTrainTime;
var firstTrainTimeConvert;
var trainFrequency;
var nextTrain;
var nextTrainPrint;
var minutesAway;

var trainInput = [];

var currentTime = moment().format("h:mm a");
var currentDateTime = moment().toString();
console.log(currentDateTime);

var convert;
var timeValue;
var convertMins;

var trainSchedule = [];



$("#displayTime").text(currentTime);

//Functions

$("#submit").on("click", function (){

  trainName = $("#trainName").val().trim();
  console.log(trainName);

  destination = $("#destination").val().trim();
  console.log(destination);

  firstTrainTime = $("#firstTrainTime").val().trim();
  firstTrainTimeConvert = moment(firstTrainTime, "hh:mm").subtract(1, "years");
  console.log(firstTrainTimeConvert);

  trainFrequency = $("#frequency").val().trim();
  trainFreqInt = parseInt(trainFrequency);
  console.log(trainFreqInt);

  var diffTime = moment().diff(moment(firstTrainTimeConvert), "minutes");
  console.log("Difference in Time: " + diffTime);

  var timeRemainder = diffTime % trainFreqInt;
  console.log(timeRemainder);

  minutesAway = trainFreqInt - timeRemainder;
  console.log(minutesAway);

  nextTrain = moment().add(minutesAway,"minutes");
  nextTrainPrint = moment(nextTrain).format("hh:mm");
  console.log(nextTrainPrint);

  clearForm();

    postData = {
    "trainName": trainName,
    "destination": destination,
    "firstTrainTime": firstTrainTime,
    "trainFrequency": trainFrequency,
    "nextTrain": nextTrainPrint,
    "minutesAway": minutesAway
  };

  database.ref().push(postData);

  return false;

});

database.ref().on("child_added", function(childSnapshot){

      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrainTime);
      console.log(childSnapshot.val().trainFrequency);
      console.log(childSnapshot.val().nextTrain);
      console.log(childSnapshot.val().minutesAway);

    $("#inputFromForm").append(
      // "<div class='schedule'>"
      "<tr>"
      + "<td scope='row'>"+ childSnapshot.val().trainName + "</td>"
      + "<td>"+ childSnapshot.val().destination + "</td>"
      + "<td>"+ childSnapshot.val().trainFrequency + "</td>"
      + "<td>"+ childSnapshot.val().nextTrain + "</td>"
      + "<td>"+ childSnapshot.val().minutesAway + "</td>"
      + "</tr>");

}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


function clearForm(){

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
}


