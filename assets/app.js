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
var trainFrequency;
var nextTrain;
var minutesAway;

var trainInput = [];

var currentTime = moment().format("h:mm a");

var convert;
var timeValue;
var convertMins;

var trainSchedule = [];

var timeObj = moment().toArray();
console.log(timeObj);


$("#displayTime").text(currentTime);

//Functions

$("#submit").on("click", addToSchedule);


function addToSchedule() {

  $("#inputFromForm").empty();

  trainName = $("#trainName").val().trim();
  console.log(trainName);

  destination = $("#destination").val().trim();
  console.log(destination);

  convertInputTime();
  // firstTrainTime = timeValue;
  firstTrainTime = $("#firstTrainTime").val().trim();
  console.log(firstTrainTime);

  trainFrequency = $("#frequency").val().trim();

  nextTrain = "XX";

  minutesAway = "";


  trainInput.push({
    "trainName": trainName,
    "destination": destination,
    "firstTrainTime": firstTrainTime,
    "trainFrequency": trainFrequency,
    "nextTrain": nextTrain,
    "minutesAway": minutesAway
  });

  userDataToFirebase();
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

function convertInputTime(){

  //Convert input time to First Train Time
  firstTrainTime = $("#firstTrainTime").val().trim();

  convert = moment(firstTrainTime, "h:mm a");
  console.log(convert);

  // convert = firstTrainTime.split(":");
  // console.log(convert);
  // var hours = Number(convert[0]);
  // var minutes = Number(convert[1]);

  // timeValue = "" + ((hours >12) ? hours - 12 : hours);
  // timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
  // timeValue += (hours >= 12) ? " P.M." : " A.M.";

  // console.log(timeValue)

//Convert frequency to minutes
  // trainFrequency = $("#frequency").val().trim();
  // convertMins += (trainFrequency < 10) ? ":0" + trainFrequency: ":" + trainFrequency;
  // console.log(convertMins);
}

// function generateTrainSchedule(){

//   for(var i = 0; i < )
// firstTrainTime = $("#firstTrainTime").val().trim();
// }

function userDataToFirebase () {
  var newDatabase = firebase.database().ref().push();


  postData = {
    "trainName": trainName,
    "destination": destination,
    "firstTrainTime": firstTrainTime,
    "trainFrequency": trainFrequency,
    "nextTrain": nextTrain,
    "minutesAway": minutesAway
  };

  newDatabase.push(postData);
}



