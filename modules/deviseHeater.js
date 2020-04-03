var intervalId = null;
let tempSensor = 20;
const on = 		function() { STORE.onDevice('heater', 0)};
const off = 	function() { STORE.offDevice('heater', 0)};
const enable = 	function() {	STORE.enableDevice('heater', 0)};
const disable = function() { STORE.disableDevice('heater', 0)};

exports.start = function() {
	const heater = STORE.getDevice('heater', 0);
	const minTemp = heater.temp - heater.hysteresis;
	if(!heater.isEnabled) return;
	intervalId = setInterval(function () {
		console.log('TEMP', tempSensor, 'LINE', heater.isOn);
		//let tempSensor = 20;
		if(tempSensor <= minTemp) {
			if(!heater.isOn) on();
			tempSensor += 0.5;
		}
		else if(tempSensor > minTemp && tempSensor < heater.temp) {
			if(heater.isOn) tempSensor += 0.5;
			else tempSensor -= 0.5;
			return;
		}
		else if(tempSensor >= heater.temp) {
			if(heater.isOn)	off();
			tempSensor -= 0.5;
		}
	}, 1000);
};
exports.stop = function() {
	clearInterval(intervalId);
	disable();
	off();
};
exports.on = on;
exports.off = off;
exports.enable = enable;
exports.disable = disable;