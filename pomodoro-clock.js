/* Pomodoro Clock */

// A FreeCodeCamp Project Challenge 
// Presented by Eric R. Kock - Feb. 2019

let countdown = 0; // variable to set/clear intervals
let seconds = 1500; // 1500 seconds left on the clock
let workTime = 25; // 25
let breakTime = 5; // 5
let increment = 1;
let isBreak = false;
let isStarted = true;

const status = document.querySelector("#timer-label");
const timerDisplay = document.querySelector("#time-left");
const startBtn = document.querySelector("#start_stop");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#session-length");
const breakMin = document.querySelector("#break-length");

const alarm = document.createElement('audio'); alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

// Add EventListeners
startBtn.addEventListener('click', () => {
   clearInterval(countdown);
   isStarted = !isStarted;
   if (!isStarted) countdown = setInterval(timer, 1000);
})

resetBtn.addEventListener('click', () => {
   clearInterval(countdown);
   seconds = 1500;
   workTime = 25;
   breakTime = 5;
   countdown = 0;
   isStarted = true;
   isBreak = false;
})

// Functions
function timer() {
   seconds --;
   if (seconds < 0) {
     clearInterval(countdown);
     alarm.currentTime = 0;
     alarm.play();
     seconds = (isBreak ? breakTime : workTime) * 60;
     isStarted = true;
     countdown = 0;
     if (isBreak == true) {
        isBreak = false;
     } else {
        isBreak = true;
     }
     continueTimer();
   } 
   updateHTML();
}

function continueTimer() {
   clearInterval(countdown);
   isStarted = !isStarted;
   if (!isStarted) countdown = setInterval(timer, 1000);
}

// Declare Actions to Buttons
document.querySelector("#session-decrement").onclick = function() {workDuration < 60 ? workDuration += increment : workDuration;}
document.querySelector("#session-increment").onclick = function() {workDuration > 0 ? workDuration -= increment : workDuration;}
document.querySelector("#break-decrement").onclick = function() {breakDuration < 60 ? breakDuration += increment : breakDuration;}
document.querySelector("#break-increment").onclick = function() {breakDuration > 0 ? breakDuration -= increment : breakDuration;}


let incrementFunctions =
   {"#session-decrement": function () { workTime = Math.min(workTime + increment, 59); seconds = workTime * 60;},
      "#session-increment": function () { workTime = Math.max(workTime - increment, 1); seconds = workTime * 60;},
      "#break-decrement": function () { breakTime = Math.min(breakTime + increment, 59)},
      "#break-increment": function () { breakTime = Math.max(breakTime - increment, 1)}};

for (var key in incrementFunctions) {if (incrementFunctions.hasOwnProperty(key)) document.querySelector(key).onclick = incrementFunctions[key];}

function countdownDisplay() {
   let minutes = Math.floor(seconds / 60);
   let remainderSeconds = seconds % 60;
   timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}
 
function buttonDisplay() {
   if (isStarted && countdown === 0) {
     startBtn.textContent = "START CountDown";
     document.documentElement.style.setProperty("--play", "navy");
   } else if (isStarted && countdown !== 0) {
     startBtn.textContent = "Continue CountDown"; 
     document.documentElement.style.setProperty("--play", "green");
   } else {
     startBtn.textContent = "Pause CountDown";
     document.documentElement.style.setProperty("--play", "red");
   }
}
 
function updateHTML() {
   countdownDisplay();
   buttonDisplay();
   if (!isBreak) {
      status.textContent = "Keep Working";
      document.documentElement.style.setProperty("--theme", "navy");
   } else {
      status.textContent = "Take a Break!";
      document.documentElement.style.setProperty("--theme", "green");
   }
   workMin.textContent = workTime;
   breakMin.textContent = breakTime;
}

updateHTML();
document.onclick = updateHTML;