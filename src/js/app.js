/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
var requestUrl = "https://jsonplaceholder.typicode.com/posts/";
var requestOffParam = "1";
var requestOnParam = "2";



var menu = new UI.Menu({
  sections: [{
    items: [{
      title: 'ON'
    }, {
      title: 'OFF'
    }]
  }]
});


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

menu.show();

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


function showWaitingCard() {
  var waitingCard = new UI.Card({
    title: "Waiting..."
  });
  waitingCard.show();
  waitingCard.on('click', function(e) {
    menu.show();
  });
}
