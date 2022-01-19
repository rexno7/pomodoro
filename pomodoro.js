let interval;
let startDate;
let initTimerValue;
let timer;
let pomodoros;

const preLoad = () => {
  initTimerValue = 25 * 60;
  timerRunning = false;
  pomodoros = 0;
  timer = document.getElementById("timer");
  timer.innerHTML = numberToTime(initTimerValue);
  startDate = Date.now();
}

const myTimer = () => {
  const delta = initTimerValue - Math.floor((Date.now() - startDate) / 1000);
  if (delta <= 0) {
    play();
    stopTimer();
  }
  var timer = document.getElementById("timer");
  timer.innerHTML = numberToTime(delta);
}

const stopTimer = () => {
  clearInterval(interval);
  document.getElementById("start-btn").setAttribute("src", "assets/play_button.png");
  timer.innerHTML = numberToTime(initTimerValue);
}

const startTimer = () => {
  clearInterval(interval);
  document.getElementById("start-btn").setAttribute("src", "assets/repeat_button.png");
  startDate = Date.now();
  interval = window.setInterval(myTimer, 500);
}

const numberToTime = (num) => {
  const minVal = Math.floor(num / 60);
  const secVal = num % 60;
  const min = minVal < 10 ? "0" + minVal : minVal;
  const sec = secVal < 10 ? "0" + secVal : secVal;
  return min + ":" + sec;
}

const play = () => {   
  var beepsound = new Audio("assets/Alarm03.wav");   
  beepsound.play();
}