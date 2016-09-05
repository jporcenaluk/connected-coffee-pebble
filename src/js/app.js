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
var requestUrl = "https://jsonplaceholder.typicode.com/posts/";
var requestOffParam = "1";
var requestOnParam = "2";

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

//Turn coffee pot on and show the result
function coffeePotOn() {
  showWaitingCard();
  
  ajax({ url: requestUrl + requestOnParam }, coffeePotOnSuccess, failureResponse);
  
  function coffeePotOnSuccess(data) {
  
    var onCard = new UI.Card({
        title: 'TURNED ON',
        body: data
      });
    onCard.show();
    onCard.on('click', function(e) {
      menu.show();
    });
  }
}

// Turn coffee pot off and show the result
function coffeePotOff() {
  showWaitingCard();
  
  ajax({ url: requestUrl + requestOffParam }, coffeePotOffSuccess, failureResponse);
  
  function coffeePotOffSuccess(data) {
  
    var offCard = new UI.Card({
      title: 'TURNED OFF',
      body: data
    });
    offCard.show();
    offCard.on('click', function(e) {
      menu.show();
    });
  }
}

// Just in case something goes wrong, show that info
function failureResponse(data) {
    
    var failureCard = new UI.Card({
        title: 'Error',
        body: data
    });
    failureCard.show();
    failureCard.on('click', function(e) {
      menu.show();
    });
}

// While we are waiting on a response, show that something is happening
function showWaitingCard() {
  var waitingCard = new UI.Card({
    title: "Waiting..."
  });
  waitingCard.show();
  waitingCard.on('click', function(e) {
    menu.show();
  });
}
