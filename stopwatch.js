const second = 60;
const minute = 60;
const millisecond = 1000;
let firstStart = true;
let running = false;
let justTicked = false;

let totalTime = 0;
let startTime = new Date();

function format(number) {
  return `${number < 10 ? "0" : ""}${number}`;
}

function formatTime(time) {
  let seconds = Math.floor((time / millisecond) % second);
  let hours = Math.floor(time / millisecond / second / minute);
  let minutes = Math.floor((time / millisecond / second) % minute);
  let timeString = `${format(hours)}:${format(minutes)}:${format(seconds)}`;

  return timeString;
}

function calcTotalTime() {
  let currentTime = new Date();
  totalTime = currentTime - startTime;
}

function printTime() {
  document.getElementById("total-time").innerHTML = formatTime(totalTime);
}

function tick() {
  if (!justTicked) {
    justTicked = true;
    setTimeout(() => {
      justTicked = false;
      if (running) {
        calcTotalTime();
        printTime();
        tick();
      }
    }, 1000);
  }
}

function startClock() {
  if (firstStart) {
    firstStart = false;
    startTime = new Date();
  } else {
    let currentTime = new Date();
    startTime = new Date(currentTime - totalTime);
  }
  running = true;
  tick();
}

function pause() {
  running = false;
}

function reset() {
  firstStart = true;
  running = false;

  totalTime = 0;
  startTime = new Date();
}
