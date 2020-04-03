var deviceStore = require('store');
//var api = require('api');
//var wifiServer = require('wifiServer');
var deviseHeater = require('deviseHeater');

/*Restore data*/
var STORE = new deviceStore();
/*END Restore data*/
// function requestApp(req, res) {
//   api.request(req, res, store);
// }

function onInit() {
  console.log('Start Init');
  digitalWrite(D2, false);
  STORE.storeInit();
  deviseHeater.start();
}

onInit();