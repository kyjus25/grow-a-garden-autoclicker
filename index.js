import { GlobalKeyboardListener } from 'node-global-key-listener';
import robot from 'robotjs';

let isEnabled = false;
let interval = null;

const start = () => {
  if (interval) return;
  console.log('Auto-presser started. Press CMD+K to stop.');
  interval = setInterval(() => {
    robot.keyTap('e');
  }, 100);
};

const stop = () => {
  if (interval) {
    console.log('Auto-presser stopped.');
    clearInterval(interval);
    interval = null;
  }
};

const v = new GlobalKeyboardListener();

v.addListener((e, down) => {
	if (e.state == "DOWN" && e.name == "K" && (down["LEFT META"] || down["RIGHT META"])) {
    isEnabled = !isEnabled;
    if (isEnabled) {
      start();
    } else {
      stop();
    }
  }
});


console.log('Press CMD+K to start/stop the auto-presser.');
