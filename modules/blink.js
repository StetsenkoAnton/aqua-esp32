class Blink {
  method() { 
  }
  static startBlink() {
  	var on = false;
	setInterval(function() {
		digitalWrite(D2, on = !on);
	}, 500);
  }
}
exports = Blink;