function iterateDevice(ctx, func) {
	for(var key in ctx.device) {
		var device = this[key];
		if(Array.isArray(device)) {
			device.forEach(function(key, item, index) {
				func(key, item, index);
			});
		}
	}
}
class Store {
	constructor() {
		this.wifi = {
			//ssid: 'Mi Phone',
			//password: '12345678'
			// ssid: 'SSA Point',
			// password: 'l33tdantist99'
			ssid: 'stenyaweb',
			password: 'As120600'
		};
		this.pins = {
			device: {
				led: [D20, D13, D14],
				load: [D21, D22],
				heater: [D2/*D25*/]
			},
			sensor: {
				temp: [D8]
			}
		};
		this.device = {
			led: [
				{ name: 'Led1',		isEnabled: true, 	isOn: false,	timeStart: '0:01', timeStop: '0:03', durationStart: '0:01', durationStop: '0:00' },
				{ name: 'Led2', 	isEnabled: false,	isOn: false,	timeStart: '0:00', timeStop: '0:00', durationStart: '1:00', durationStop: '1:00' },
				{ name: 'Led3',		isEnabled: false, isOn: false,	timeStart: '0:00', timeStop: '0:00', durationStart: '1:00', durationStop: '1:00' },
			],
			load: [
				{ name: 'Aerator', 	isEnabled: true, 	isOn: false,	timeStart: '8:00', timeStop: '22:00' },
				{ name: 'Filter', 	isEnabled: true, 	isOn: false,	timeStart: '0:00', timeStop: '0:00' }
			],
			heater: [
				{ name: 'Heater', isEnabled: true,	isOn: false,	temp: 24, hysteresis: 3, lineSensor: 1 }
			]
		};
		/**/
		this.sensor = {
			temp: [
				{ name: 'Line 1', isEnabled: true,	temp: 24 },
				{ name: 'Line 2', isEnabled: true,	temp: 0 },
				{ name: 'Line 3', isEnabled: true,	temp: 30 },
			]
		};
	}
	readFromMemory() {
		return true;
	}
	saveToMemory() {

	}
	// getStore() {
	// 	function pinsLess({pins, ...other}) { return other }
	// 	return pinsLess(this)
	// }
	getDevice(deviceName, id, param) {
		console.log(deviceName, id, param, deviceName && id && param, deviceName && typeof id === "number" && !param);
		if(deviceName && typeof id === "number" && param) {
			console.log('inside 1', deviceName, id, param);
			return this.device[deviceName][id][param];
		}
		if(deviceName && typeof id === "number" && !param) {
			console.log('inside 2', deviceName, id, param);
			console.log(this.device[deviceName][id]);
			return this.device[deviceName][id];
		}
		if(!deviceName) return this.device;
	}
	getDevicePin(deviceName, id) {
		return this.pins.device[deviceName][id];
	}
	setDevice(value, deviceName, id, param) {
		if(deviceName && !param) this.device[deviceName][id] = value;
		if(deviceName && param) this.device[deviceName][id][param] = value;
	}
	enableDevice(deviceName, id) {
		this.device[deviceName][id].isEnabled = true;
	}
	disableDevice(deviceName, id) {
		this.device[deviceName][id].isEnabled = false;
		this.device[deviceName][id].isOn = false;
		digitalWrite(this.getDevicePin(deviceName, id), false);
	}
	onDevice(deviceName, id) {
		this.device[deviceName][id].isOn = true;
		digitalWrite(this.getDevicePin(deviceName, id), true);
	}
	offDevice(deviceName, id) {
		this.device[deviceName][id].isOn = false;
		digitalWrite(this.getDevicePin(deviceName, id), false);
	}
	readDevicePinsMode() {
		let readPin = function(key, item, index) {
			item.isOn = !!digitalRead(this.getDevicePin(key, index));
		};
		iterateDevice(this, readPin);
	}
	writeDevicePinsMode() {
		let writePin = function(key, item, index) {
			digitalWrite(this.getDevicePin(key, index), item.isOn);
		};
		iterateDevice(this, writePin);
	}
	storeInit() {
		//this.readFromMemory();
		//this.writeDevicePinsMode();
	}
}
exports = Store;