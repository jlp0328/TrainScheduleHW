//GLOBAL VARIABLES
var trainName;
var destination;
var firstTrainTime;
var trainFrequency;
var nextTrain;
var minutesAway;

var trainInput = [];

var date;
var timeHours;
var timeMinutes;
var amPm;
var currentTime;

//Functions

getCurrentTime();

$("#submit").on("click", addToSchedule);

function addToSchedule() {

  $("#inputFromForm").empty();

  trainName = $("#trainName").val().trim();
  console.log(trainName);

  destination = $("#destination").val().trim();
  console.log(destination);

  firstTrainTime = $("#firstTrainTime").val().trim();

  trainFrequency = $("#frequency").val().trim();

  nextTrain = "XX";

  minutesAway = currentTime;

  convertInputTime();


  trainInput.push({
    "trainName": trainName,
    "destination": destination,
    "firstTrainTime": firstTrainTime,
    "trainFrequency": trainFrequency,
    "nextTrain": nextTrain,
    "minutesAway": minutesAway
  })

  clearForm();
  populateSchedule();

console.log(trainInput);
}

function populateSchedule(){

  for(var i = 0; i < trainInput.length; i++){
    var trainRow = $("<tr>");
    var printTrainName = $("<td scope='row'>"+ trainInput[i].trainName + "</td>");
    var printDestName = $("<td>"+ trainInput[i].destination + "</td>");
    var printFirstTT = $("<td>"+ trainInput[i].firstTrainTime + "</td>");
    var printTrainFreq = $("<td>"+ trainInput[i].trainFrequency + "</td>");
    var printNextTrain = $("<td>"+ trainInput[i].nextTrain + "</td>");
    var printMinsAway = $("<td>"+ trainInput[i].minutesAway + "</td>");

    $("#inputFromForm").append(trainRow);
    trainRow.append(printTrainName);
    trainRow.append(printDestName);
    trainRow.append(printTrainFreq);
    trainRow.append(printNextTrain);
    trainRow.append(printMinsAway);

    };
}

function clearForm(){

  $("#trainName").val("");
  $("#destination").val("");
  $("#firstTrainTime").val("");
  $("#frequency").val("");
}

function getCurrentTime(){

  date = new Date();
  console.log(date);

  timeHours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours;
  console.log(timeHours);

  timeMinutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();

  amPm = date.getHours() >=12 ? "PM" : "AM";

  currentTime = timeHours + ":" + timeMinutes + " " + amPm;
  console.log(currentTime);

  $("#displayTime").text(currentTime);

}

function convertInputTime(){

  firstTrainTime = $("#firstTrainTime").val().trim();


}

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-FCfLYDFh1aDUnHv0W_XBwgnb8eioGv4",
    authDomain: "trainschedulehw.firebaseapp.com",
    databaseURL: "https://trainschedulehw.firebaseio.com",
    storageBucket: "trainschedulehw.appspot.com",
    messagingSenderId: "712147932687"
  };

  firebase.initializeApp(config);
