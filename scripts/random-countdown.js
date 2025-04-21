// JavaScript logic for the random countdown timer

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    const minTimeInput = document.getElementById("minTime");
    const maxTimeInput = document.getElementById("maxTime");
    const messageDiv = document.getElementById("message");
    const bell = document.getElementById("bell");

    let timerId = null;
    const alarm = new Audio("assets/random-countdown.mp3");

    startButton.addEventListener("click", () => {
        if (startButton.textContent.trim() === "Start Timer") {
            const minTime = parseInt(minTimeInput.value, 10);
            const maxTime = parseInt(maxTimeInput.value, 10);

            if (isNaN(minTime) || isNaN(maxTime) || minTime <= 0 || maxTime <= 0 || minTime > maxTime) {
                messageDiv.textContent = "Please enter valid minimum and maximum times.";
                return;
            }

            messageDiv.textContent = "Timer is running...";
            startButton.textContent = "Stop Timer";

            const startRandomCountdown = () => {
                const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
                console.log(`Random countdown set for ${randomTime} seconds`);

                timerId = setTimeout(() => {
                    // Play the alarm
                    alarm.play();
                    setTimeout(() => alarm.pause(), 3000); // Stop the alarm after 3 seconds
                    alarm.currentTime = 0; // Reset the alarm for the next countdown

                    // Show and shake the bell
                    bell.style.display = "block";
                    bell.style.animation = "shake 0.5s ease-in-out infinite";

                    // Stop the shaking after 3 seconds
                    setTimeout(() => {
                        bell.style.animation = "none";
                        bell.style.display = "none"; // Hide the bell after shaking
                    }, 3000);

                    // Start a new countdown if the timer is still running
                    if (startButton.textContent.trim() === "Stop Timer") {
                        startRandomCountdown();
                    }
                }, randomTime * 1000);
            };

            startRandomCountdown();
        } else {
            // Stop the timer
            clearTimeout(timerId);
            timerId = null;
            alarm.pause();
            alarm.currentTime = 0; // Reset the alarm
            bell.style.animation = "none"; // Stop the bell animation
            bell.style.display = "none"; // Hide the bell
            messageDiv.textContent = "Timer stopped.";
            startButton.textContent = "Start Timer";
        }
    });
});