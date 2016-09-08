/**
 * The purpose of this app is to start a coffee pot remotely from a Pebble watch. 
 * You can use https://cloudpebble.net and select Pebble.js as the type of new project to write, build, and download the compiled version of this app.
 * Check out https://pebble.github.io/pebblejs/ for great documentation of Pebble.js
 * Check out https://developer.pebble.com/ for general Pebble developer documentation
 */

// Dependencies
var UI = require('ui');
var ajax = require('ajax');

// Globals
var requestUrl = "http://192.168.1.3/send/vera/pressbutton?params=";
var requestOnParam = "7";
var requestOffParam = "8";


// Create menu options to choose On or Off
var menu = new UI.Menu({
  sections: [{
    items: [{
      title: 'ON'
    }, {
      title: 'OFF'
    }]
  }]
});

// Create menu actions for when item is selected
menu.on('select', function(e) {
  if (e.item.title == "ON") {
    //Make Ajax request to turn on and show result
    coffeePotOn();
  }
  else {
    //Make Ajax request to turn off and show result
    coffeePotOff();
  }
});

// Show menu as default screen
menu.show();

/*** CARDS ***/

//On Card
var onCard = new UI.Card({
  title: 'TURNED ON'
});
onCard.on('click', 'select', function(e) {
  showMenu();
});

//Off Card
var offCard = new UI.Card({
  title: 'TURNED OFF'
});
offCard.on('click', 'select', function(e) {
  showMenu();
});

//Waiting Card
var waitingCard = new UI.Card({
  title: "Waiting..."
});
waitingCard.on('click', 'select', function(e) {
  showMenu();
});

//Failure Card
var failureCard = new UI.Card({
  title: 'Error'
});
failureCard.on('click', 'select', function(e) {
  showMenu();
});

/*** FUNCTIONS ***/

//Turn coffee pot on and show the result
function coffeePotOn() {
  waitingCard.show();
  
  ajax({ url: requestUrl + requestOnParam }, coffeePotOnSuccess, failureResponse);
  
  function coffeePotOnSuccess(data) {
    onCard.body(data);
    onCard.show();
  }
}

// Turn coffee pot off and show the result
function coffeePotOff() {
  waitingCard.show();
  
  ajax({ url: requestUrl + requestOffParam }, coffeePotOffSuccess, failureResponse);
  
  function coffeePotOffSuccess(data) {
    offCard.body(data);
    offCard.show();
  }
}

// Just in case something goes wrong, show that info
function failureResponse(data) {
    failureCard.body(data);
    failureCard.show();
}

// Hide all but the show menu to remove them from window stack frame
function showMenu() {
  menu.show();
  onCard.hide();
  offCard.hide();
  failureCard.hide();
  waitingCard.hide();
}