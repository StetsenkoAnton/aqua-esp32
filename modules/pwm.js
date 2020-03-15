class PwmLed {
  method() { 
  }
  static startBlink() {
  	var light = 0.1;
	setInterval(function() {
		if(light === 1) light = 0;
		else light += 0.1;
		analogWrite(D2, light, {freq: 20, soft: true});
	}, 1500);
  }
}
exports = PwmLed;