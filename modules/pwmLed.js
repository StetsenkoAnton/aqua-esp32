class PwmLed {
  static startPWM(time) {
  	  var sec = time * 60 || 60;
	  var light = 0;
	  var id = setInterval(function() {
	    if(light >= 1) clearInterval(id);
	    else light += 0.05;
	    analogWrite(D2, light, {freq: 100, soft: true})
	  }, (sec*50));
  }
}
exports = PwmLed