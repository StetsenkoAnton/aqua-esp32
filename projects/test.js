var pwm = require('pwmLed');

function onInit() {
  console.log('Start Init');
  digitalWrite(D2, false);
  pwm.startPWM();  
}

onInit();