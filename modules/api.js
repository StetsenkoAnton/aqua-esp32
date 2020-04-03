exports.request = function(req, res, store) {
	console.log('apiRequest start');
	function requestFunc(func) {
		var data = "";
		req.on('data', function(d) { data = d; });
		req.on('end',  function () {return func(data)});
	}
	function responseOk(data) {
		res.writeHead(200, headers);
		res.end(JSON.stringify(data || ''));
	}
	var a = url.parse(req.url, true);
	const headers = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
		//'Access-Control-Allow-Credentials': true,
		'Access-Control-Request-Headers': req.headers['Access-Control-Request-Headers'],
		'Content-Type': 'application/json; charset=utf-8',
	};
	console.log("PATH: ", a.pathname, "METHOD", req.method);
	const pathSwitch = `${req.method}${a.pathname}`;
	if (req.method === "OPTIONS") {
		res.writeHead(204, headers);
		res.end();
	}
	switch (pathSwitch) {
		case 'POST/api/deviceTime':
			requestFunc(function(data) {
				console.log('START set time', data);
				setTime(data.time/1000);
				console.log(new Date());
				responseOk();
				console.log('END set time');
			});
			break;
		case 'POST/api/setLed':
			requestFunc(function() {
				console.log('START led');
				digitalWrite(D2, data === 'true');
				responseOk();
				console.log('END led');
			});
			break;
		case 'GET/api/settings':
			requestFunc(function() {
				console.log('START settings');
				responseOk(store.getValue());
				console.log('END settings');
			});
			break;
	}
};
