var wifi = require('Wifi');
var http = require('http');

exports.wifi_connect = function () {
	console.log('WIFI connecting...');
	wifi.connect(STORE.getValue('wifi', 'ssid'),
		{password: STORE.getValue('wifi', 'password')},
		(err)=> {
			if(err) { console.log(err); }
			else {
				http.createServer(requestApp).listen(80);
				console.log(`Web server running at http://${wifi.getIP().ip}`);
			}
		});
};

//
//if(wifi.getStatus().station === "Unknown reason") setTimeout(connectWifiFirst, 1000);
exports.wifi_scanNet = function () {
	console.log(store.getValue('wifi','ssid'));
	wifi.scan((err, list)=> {
		if(list) {
			console.log(list);
			return list;
		}
		if(err) console.log('err',err);
	});
};
exports.wifi_addListeners = function () {
	wifi.on('disconnected', () => {
		console.log('WIFI disconnected');
	});
	wifi.on('connected', () => {
		console.log('WIFI connected');
	})
};