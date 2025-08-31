let timerDisplay = document.getElementById("timer");
let startTime = null;
let running = false;
let intervalId = null;

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    event.preventDefault();
    if (!running) {
      startTime = Date.now();
      intervalId = setInterval(() => {
        let elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        timerDisplay.textContent = `${elapsed}s`;
      }, 100);
      running = true;
    } else {
      clearInterval(intervalId);
      running = false;
    }
  }
});
