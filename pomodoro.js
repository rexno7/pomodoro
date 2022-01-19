// Timer
let interval;

// Values
let startDate;
let timerLengths;
let messages;

// Timer Lengths
let pomodoroLength;
let shortBreakLength;
let longBreakLength;

// Document Objects
let timer;
let positiveMessage;

// State Values
let pomodoros;
let state;

const preLoad = () => {
  // Init values
  timerLengths = [25 * 60, 5 * 60, 15 * 60];
  pomodoros = 0;
  state = 0;
  messages = ["Focus Up!", "Short Break!", "Good Job! Enjoy the long break!"]
  
  // Document Objects
  timer = document.getElementById("timer");
  positiveMessage = document.getElementById("positive-message");

  // Fil Timer
  initPomodoro();
  startDate = Date.now();
}

const changeTimerType = () => {
  state = (state + 1) % 3;
  positiveMessage.innerHTML = messages[state];
  if (state == 0) { initPomodoro(); }
  if (state == 1) { initShortBreak(); }
  if (state == 2) { initLongBreak();}
  stopTimer();
}

const initPomodoro = () => {
  timer.innerHTML = numberToTime(timerLengths[state]);
  document.body.setAttribute("class", "purple");
}

const initShortBreak = () => {
  timer.innerHTML = numberToTime(timerLengths[state]);
  document.body.setAttribute("class", "green");
}

const initLongBreak = () => {
  timer.innerHTML = numberToTime(timerLengths[state]);
  document.body.setAttribute("class", "blue");
}

const myTimer = () => {
  const delta = timerLengths[state] - Math.floor((Date.now() - startDate) / 1000);
  if (delta <= 0) {
    play();
    stopTimer();
  }
  var timer = document.getElementById("timer");
  timer.innerHTML = numberToTime(delta);
}

// TODO: Fix bug where timer doesn't update here 
//       (probably race condition with interval and timer update)
const stopTimer = () => {
  clearInterval(interval);
  document.getElementById("start-btn").setAttribute("src", "assets/play_button.png");
  timer.innerHTML = numberToTime(timerLengths[state]);
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