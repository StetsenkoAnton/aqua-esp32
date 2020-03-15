var wifi = require('Wifi');
var http = require('http');
//var ssid = 'SSA Point';
//var password = 'l33tdantist99';

var ssid = 'Mi Phone';
var password = '12345678';
var port = 80;

function apiRequest(req, res) {
  console.log('apiRequest start');
  var a = url.parse(req.url, true);
  const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Request-Headers': req.headers['Access-Control-Request-Headers']
    };
  console.log("PATH: ", a.pathname, "METHOD", req.method);
  if (req.method === "OPTIONS") {
    res.writeHead(204, headers);
    res.end();
  }
  if (req.method === "POST" && a.pathname === '/setLed') {
    var data = "";
    req.on('data', (d)=> { data = d; });
    req.on('end',  ()=> {
      console.log('START Post setLed', data);
      digitalWrite(D2, data === 'true' ? true : false);
      res.writeHead(200, headers);
      res.end();
      console.log('END Post setLed');
    });
  }
}

function connectWifiFirst() {
  console.log('WIFI connecting...');
  wifi.connect(ssid, {password: password}, (err)=> {
    if(err) {
      console.log(err);
    }
    else {
      http.createServer(apiRequest).listen(port);
      console.log(`Web server running at http://${wifi.getIP().ip}:${port}`);
    } 
  });
}
function connectWifi() {
  console.log('WIFI connecting...');
  wifi.connect(ssid, {password: password}, (err)=> {
    if(err) {
      console.log(err);
    }
    else {
      console.log(`Web server running at http://${wifi.getIP().ip}:${port}`);
    } 
  });
}

function onInit() {
  console.log('Start Init');
  digitalWrite(D2, false);
  wifi.scan((err, list)=> {
    if(list) console.log(list);
    if(err) console.log('err',err);
  });
  //if(wifi.getStatus().station === "Unknown reason") setTimeout(connectWifiFirst, 1000);

  //setTimeout(connectWifiFirst, 1000);
  wifi.on('disconnected', ()=> {
    console.log('WIFI disconnected');
  });
  wifi.on('connected', ()=> {
    console.log('WIFI connected');
  }); 
}

onInit();