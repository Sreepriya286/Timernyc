// let timerInterval;
// let totalSeconds = 0;
// let isRunning = false;
// let bellTime = 10;
// let flashInterval;
// let bellInterval;

// // Function to set the initial timer values
// function setTimer() {
//     const minutes = parseInt(document.getElementById('minutes').value);
//     const seconds = parseInt(document.getElementById('seconds').value);
//     totalSeconds = minutes * 60 + seconds;
//     updateTimerDisplay();
// }

// // Function to start the timer countdown
// function startTimer() {
//     if (!isRunning && totalSeconds > 0) {
//         isRunning = true;
//         bellTime = parseInt(document.getElementById('bell-seconds').value); // Get the bell time
//         timerInterval = setInterval(countDown, 1000);
//     }
// }

// // Function to pause the timer
// function pauseTimer() {
//     clearInterval(timerInterval);
//     isRunning = false;
// }

// // Function to reset the timer
// function resetTimer() {
//     clearInterval(timerInterval);
//     clearInterval(flashInterval);
//     clearInterval(bellInterval);
//     totalSeconds = 0;
//     isRunning = false;
//     updateTimerDisplay();
//     stopFlashing();
// }

// // Function to add 1 minute to the timer
// function addTime() {
//     totalSeconds += 60;
//     updateTimerDisplay();
// }

// // Function to subtract 1 minute from the timer
// function subtractTime() {
//     totalSeconds = Math.max(0, totalSeconds - 60);
//     updateTimerDisplay();
// }

// // Function to update the displayed timer
// function updateTimerDisplay() {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     document.getElementById('timer-display').textContent = 
//         `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// }

// // Function to update the displayed timer
// function updateTimerDisplay() {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
    
//     const timerDisplay = document.getElementById('timer-display');
    
//     if (totalSeconds > 0) {
//         timerDisplay.style.fontSize = "450px"; // Normal timer font size
//         timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     } else {
//         timerDisplay.style.fontSize = "200px"; // Smaller font for "Time's Up!" message
//         timerDisplay.textContent = "Time's Up!";
//     }
// }

// // Function to handle the countdown logic
// function countDown() {
//     if (totalSeconds > 0) {
//         totalSeconds--;
//         updateTimerDisplay();
        
//         // Trigger the bell and flashing together when the time reaches the bellTime
//         if (totalSeconds === bellTime) {
//             startBellAndFlashing();
//         }

//         // Ensure the flashing continues until the timer reaches zero
//         if (totalSeconds <= 5) {
//             startFlashing();
//         }

//     } else {
//         resetTimer();
//         document.getElementById('timer-display').textContent = "Time's Up!";
//     }
// }

// // Function to start the bell and flashing simultaneously
// function startBellAndFlashing() {
//     // Start the bell sound every second for the remaining time until zero
//     bellInterval = setInterval(() => {
//         if (totalSeconds > 0) {
//             document.getElementById('bell-sound').play();
//         } else {
//             clearInterval(bellInterval);
//         }
//     }, 1000);

//     // Start flashing the background
//     startFlashing();
// }

// // Manual bell play function with synchronized flashing for 10 seconds
// function playBellNow() {
//     // Start the bell and flashing for 10 seconds
//     let duration = 10; // Duration for the bell and flash

//     // Play the bell immediately, then every second for the remaining 9 seconds
//     document.getElementById('bell-sound').play();

//     bellInterval = setInterval(() => {
//         if (duration > 1) { // We've already played the first bell, so play 9 more times
//             document.getElementById('bell-sound').play();
//             duration--;
//         } else {
//             clearInterval(bellInterval);
//             stopFlashing(); // Stop flashing after 10 seconds
//         }
//     }, 1000); // Play the bell every 1 second

//     startFlashing();
// }


// // Function to start flashing background color
// function startFlashing() {
//     if (!flashInterval) {
//         flashInterval = setInterval(() => {
//             document.body.style.backgroundColor = 
//                 document.body.style.backgroundColor === 'red' ? 'black' : 'red';
//         }, 500);
//     }
// }

// // Stop flashing and reset background color to black
// function stopFlashing() {
//     clearInterval(flashInterval);
//     flashInterval = null;
//     document.body.style.backgroundColor = 'black';
// }

// let timerInterval;
// let totalSeconds = 0;
// let initialTotal = 0; // For blackout logic reference
// let isRunning = false;
// let bellTime = 10;
// let flashInterval;
// let bellInterval;
// let audioContext;

// // Initialize audio context for fallback beep
// function initAudio() {
//     try {
//         audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     } catch (e) {
//         console.log('Web Audio API not supported');
//     }
// }

// // Create a simple beep sound using Web Audio API
// function createBeep(frequency = 800, duration = 200) {
//     if (!audioContext) return;
    
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
    
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);
    
//     oscillator.frequency.value = frequency;
//     oscillator.type = 'sine';
    
//     gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
//     oscillator.start(audioContext.currentTime);
//     oscillator.stop(audioContext.currentTime + duration / 1000);
// }

// // Play bell sound with fallback
// function playBellSound() {
//     const bellSound = document.getElementById('bell-sound');
//     if (bellSound && bellSound.src) {
//         bellSound.play().catch(() => {
//             createBeep();
//         });
//     } else {
//         createBeep();
//     }
// }

// // Function to set the initial timer values
// function setTimer() {
//     const minutes = parseInt(document.getElementById('minutes').value) || 0;
//     const seconds = parseInt(document.getElementById('seconds').value) || 0;
//     totalSeconds = minutes * 60 + seconds;
//     initialTotal = totalSeconds; // Store original duration for blackout logic

//     updateTimerDisplay();

//     // Show timer + host controls initially
//     document.getElementById('timer-container').style.display = 'block'; 
//     document.getElementById('host-controls').style.display = 'block';
//     document.getElementById('toggle-controls').style.display = 'none';
//     document.body.classList.remove("blackout");
// }

// // Function to start the timer countdown
// function startTimer() {
//     if (!isRunning && totalSeconds > 0) {
//         isRunning = true;
//         bellTime = parseInt(document.getElementById('bell-seconds').value); 
//         timerInterval = setInterval(countDown, 1000);
        
//         if (!audioContext) initAudio(); // Initialize audio context on first interaction
//     }
// }

// // Function to pause the timer
// function pauseTimer() {
//     clearInterval(timerInterval);
//     isRunning = false;
// }

// // Function to reset the timer
// function resetTimer() {
//     clearInterval(timerInterval);
//     clearInterval(flashInterval);
//     clearInterval(bellInterval);
//     totalSeconds = initialTotal;
//     isRunning = false;
//     updateTimerDisplay();
//     stopFlashing();

//     // Reset visibility
//     document.getElementById('timer-container').style.display = 'block'; 
//     document.getElementById('host-controls').style.display = 'block';
//     document.getElementById('toggle-controls').style.display = 'none';
//     document.body.classList.remove("blackout");
// }

// // Function to add 1 minute
// function addTime() {
//     totalSeconds += 60;
//     initialTotal += 60; 
//     updateTimerDisplay();
// }

// // Function to subtract 1 minute
// function subtractTime() {
//     totalSeconds = Math.max(0, totalSeconds - 60);
//     initialTotal = Math.max(0, initialTotal - 60);
//     updateTimerDisplay();
// }

// // Update timer display and blackout logic
// function updateTimerDisplay() {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     const timerDisplay = document.getElementById('timer-display');

//     if (totalSeconds > 0) {
//         timerDisplay.style.fontSize = "450px"; 
//         timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     } else {
//         timerDisplay.style.fontSize = "200px";
//         timerDisplay.textContent = "Time's Up!";
//     }

//     // Blackout logic
//     const body = document.body;
//     if (totalSeconds <= initialTotal - 60 && totalSeconds > 300) {
//         body.classList.add("blackout"); // Hide timer + controls
//     } else {
//         body.classList.remove("blackout");
//     }
// }

// // Countdown function
// function countDown() {
//     if (totalSeconds > 0) {
//         totalSeconds--;
//         updateTimerDisplay();

//         const timerContainer = document.getElementById('timer-container');
//         const hostControls = document.getElementById('host-controls');
//         const toggleButton = document.getElementById('toggle-controls');

//         // Visibility logic
//         if (totalSeconds <= 300) { // last 5 minutes
//             timerContainer.style.display = 'block';
//             hostControls.style.display = 'block';
//             toggleButton.style.display = 'none';
//             document.body.classList.remove("blackout");
//         } else if (totalSeconds <= initialTotal - 60) { // after first minute
//             timerContainer.style.display = 'none';
//             hostControls.style.display = 'none';
//             toggleButton.style.display = 'block'; // show toggle
//             document.body.classList.add("blackout");
//         } else { // first minute
//             timerContainer.style.display = 'block';
//             hostControls.style.display = 'block';
//             toggleButton.style.display = 'none';
//             document.body.classList.remove("blackout");
//         }

//         if (totalSeconds === bellTime) {
//             startBellAndFlashing();
//         }

//         if (totalSeconds <= 5) {
//             startFlashing();
//         }

//     } else {
//         resetTimer();
//         document.getElementById('timer-display').textContent = "Time's Up!";
//     }
// }

// // Toggle host controls manually
// function toggleControls() {
//     const hostControls = document.getElementById('host-controls');
//     const toggleButton = document.getElementById('toggle-controls');

//     if (hostControls.style.display === 'none') {
//         hostControls.style.display = 'block';
//         toggleButton.style.display = 'none';
//     } else {
//         hostControls.style.display = 'none';
//         toggleButton.style.display = 'block';
//     }
// }

// // Start bell + flashing
// function startBellAndFlashing() {
//     bellInterval = setInterval(() => {
//         if (totalSeconds > 0) {
//             playBellSound();
//         } else {
//             clearInterval(bellInterval);
//         }
//     }, 1000);

//     startFlashing();
// }

// // Manual bell
// function playBellNow() {
//     if (!audioContext) initAudio();
    
//     let duration = 10; 
//     playBellSound();

//     bellInterval = setInterval(() => {
//         if (duration > 1) { 
//             playBellSound();
//             duration--;
//         } else {
//             clearInterval(bellInterval);
//             stopFlashing();
//         }
//     }, 1000);

//     startFlashing();
// }

// // Flashing background
// function startFlashing() {
//     if (!flashInterval) {
//         flashInterval = setInterval(() => {
//             document.body.style.backgroundColor = 
//                 document.body.style.backgroundColor === 'red' ? 'black' : 'red';
//         }, 500);
//     }
// }

// function stopFlashing() {
//     clearInterval(flashInterval);
//     flashInterval = null;
//     document.body.style.backgroundColor = 'black';
// }

// // Initialize audio on page load (will actually start on first user interaction)
// document.addEventListener('DOMContentLoaded', function() {
//     // Browser policies require user interaction before audio can play
// });


// let timerInterval;
// let totalSeconds = 0;
// let initialTotal = 0; // For blackout logic reference
// let isRunning = false;
// let bellTime = 10;
// let flashInterval;
// let bellInterval;
// let audioContext;

// // Initialize audio context for fallback beep
// function initAudio() {
//     try {
//         audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     } catch (e) {
//         console.log('Web Audio API not supported');
//     }
// }

// // Create a simple beep sound using Web Audio API
// function createBeep(frequency = 800, duration = 200) {
//     if (!audioContext) return;
    
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();
    
//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);
    
//     oscillator.frequency.value = frequency;
//     oscillator.type = 'sine';
    
//     gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
//     oscillator.start(audioContext.currentTime);
//     oscillator.stop(audioContext.currentTime + duration / 1000);
// }

// // Play bell sound with fallback
// function playBellSound() {
//     const bellSound = document.getElementById('bell-sound');
//     if (bellSound && bellSound.src) {
//         bellSound.play().catch(() => {
//             createBeep();
//         });
//     } else {
//         createBeep();
//     }
// }

// // Function to set the initial timer values
// function setTimer() {
//     const minutes = parseInt(document.getElementById('minutes').value) || 0;
//     const seconds = parseInt(document.getElementById('seconds').value) || 0;
//     totalSeconds = minutes * 60 + seconds;
//     initialTotal = totalSeconds;

//     updateTimerDisplay();

//     const hostControls = document.getElementById('host-controls');
//     const timerContainer = document.getElementById('timer-container');
//     const toggleButton = document.getElementById('toggle-controls');

//     timerContainer.style.display = 'block';
//     hostControls.style.visibility = 'visible';
//     toggleButton.style.display = 'none';
//     document.body.classList.remove("blackout");
// }

// // Function to start the timer countdown
// function startTimer() {
//     if (!isRunning && totalSeconds > 0) {
//         isRunning = true;
//         bellTime = parseInt(document.getElementById('bell-seconds').value); 
//         timerInterval = setInterval(countDown, 1000);
        
//         if (!audioContext) initAudio();
//     }
// }

// // Function to pause the timer
// function pauseTimer() {
//     clearInterval(timerInterval);
//     isRunning = false;
// }

// // Function to reset the timer
// function resetTimer() {
//     clearInterval(timerInterval);
//     clearInterval(flashInterval);
//     clearInterval(bellInterval);
//     totalSeconds = initialTotal;
//     isRunning = false;
//     updateTimerDisplay();
//     stopFlashing();

//     const hostControls = document.getElementById('host-controls');
//     const timerContainer = document.getElementById('timer-container');
//     const toggleButton = document.getElementById('toggle-controls');

//     timerContainer.style.display = 'block';
//     hostControls.style.visibility = 'visible';
//     toggleButton.style.display = 'none';
//     document.body.classList.remove("blackout");
// }

// // Function to add 1 minute
// function addTime() {
//     totalSeconds += 60;
//     initialTotal += 60; 
//     updateTimerDisplay();
// }

// // Function to subtract 1 minute
// function subtractTime() {
//     totalSeconds = Math.max(0, totalSeconds - 60);
//     initialTotal = Math.max(0, initialTotal - 60);
//     updateTimerDisplay();
// }

// // Update timer display and blackout logic
// function updateTimerDisplay() {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     const timerDisplay = document.getElementById('timer-display');

//     if (totalSeconds > 0) {
//         timerDisplay.style.fontSize = "450px"; 
//         timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     } else {
//         timerDisplay.style.fontSize = "200px";
//         timerDisplay.textContent = "Time's Up!";
//     }

//     // Blackout logic
//     if (totalSeconds <= initialTotal - 60 && totalSeconds > 300) {
//         document.body.classList.add("blackout");
//     } else {
//         document.body.classList.remove("blackout");
//     }
// }

// // Countdown function
// function countDown() {
//     if (totalSeconds > 0) {
//         totalSeconds--;
//         updateTimerDisplay();

//         const timerContainer = document.getElementById('timer-container');
//         const hostControls = document.getElementById('host-controls');
//         const toggleButton = document.getElementById('toggle-controls');

//         // Visibility logic
//         if (totalSeconds <= 300) { // last 5 minutes
//             timerContainer.style.display = 'block';
//             hostControls.style.visibility = 'visible';
//             toggleButton.style.display = 'none';
//             document.body.classList.remove("blackout");
//         } else if (totalSeconds <= initialTotal - 60) { // after first minute
//             timerContainer.style.display = 'none';
//             hostControls.style.visibility = 'hidden'; // keep layout space
//             toggleButton.style.display = 'block'; 
//             document.body.classList.add("blackout");
//         } else { // first minute
//             timerContainer.style.display = 'block';
//             hostControls.style.visibility = 'visible';
//             toggleButton.style.display = 'none';
//             document.body.classList.remove("blackout");
//         }

//         if (totalSeconds === bellTime) {
//             startBellAndFlashing();
//         }

//         if (totalSeconds <= 5) {
//             startFlashing();
//         }

//     } else {
//         resetTimer();
//         document.getElementById('timer-display').textContent = "Time's Up!";
//     }
// }

// // Toggle host controls manually
// function toggleControls() {
//     const hostControls = document.getElementById('host-controls');
//     const toggleButton = document.getElementById('toggle-controls');

//     if (hostControls.style.visibility === 'hidden') {
//         hostControls.style.visibility = 'visible';
//         toggleButton.style.display = 'none';
//     } else {
//         hostControls.style.visibility = 'hidden';
//         toggleButton.style.display = 'block';
//     }
// }

// // Start bell + flashing
// function startBellAndFlashing() {
//     bellInterval = setInterval(() => {
//         if (totalSeconds > 0) {
//             playBellSound();
//         } else {
//             clearInterval(bellInterval);
//         }
//     }, 1000);

//     startFlashing();
// }

// // Manual bell
// function playBellNow() {
//     if (!audioContext) initAudio();
    
//     let duration = 10; 
//     playBellSound();

//     bellInterval = setInterval(() => {
//         if (duration > 1) { 
//             playBellSound();
//             duration--;
//         } else {
//             clearInterval(bellInterval);
//             stopFlashing();
//         }
//     }, 1000);

//     startFlashing();
// }

// // Flashing background
// function startFlashing() {
//     if (!flashInterval) {
//         flashInterval = setInterval(() => {
//             document.body.style.backgroundColor = 
//                 document.body.style.backgroundColor === 'red' ? 'black' : 'red';
//         }, 500);
//     }
// }

// function stopFlashing() {
//     clearInterval(flashInterval);
//     flashInterval = null;
//     document.body.style.backgroundColor = 'black';
// }

// // Initialize audio on page load
// document.addEventListener('DOMContentLoaded', function() {
//     // Audio will start on first user interaction
// });







// // let timerInterval;
// // let totalSeconds = 0;
// // let initialTotal = 0; // For blackout logic reference
// // let isRunning = false;
// // let bellTime = 10;
// // let flashInterval;
// // let bellInterval;
// // let audioContext;

// // // Initialize audio context for fallback beep
// // function initAudio() {
// //     try {
// //         audioContext = new (window.AudioContext || window.webkitAudioContext)();
// //     } catch (e) {
// //         console.log('Web Audio API not supported');
// //     }
// // }

// // // Create a simple beep sound using Web Audio API
// // function createBeep(frequency = 800, duration = 200) {
// //     if (!audioContext) return;
    
// //     const oscillator = audioContext.createOscillator();
// //     const gainNode = audioContext.createGain();
    
// //     oscillator.connect(gainNode);
// //     gainNode.connect(audioContext.destination);
    
// //     oscillator.frequency.value = frequency;
// //     oscillator.type = 'sine';
    
// //     gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
// //     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
    
// //     oscillator.start(audioContext.currentTime);
// //     oscillator.stop(audioContext.currentTime + duration / 1000);
// // }

// // // Play bell sound with fallback
// // function playBellSound() {
// //     const bellSound = document.getElementById('bell-sound');
// //     if (bellSound && bellSound.src) {
// //         bellSound.play().catch(() => {
// //             createBeep();
// //         });
// //     } else {
// //         createBeep();
// //     }
// // }

// // // Set timer
// // function setTimer() {
// //     const minutes = parseInt(document.getElementById('minutes').value) || 0;
// //     const seconds = parseInt(document.getElementById('seconds').value) || 0;
// //     totalSeconds = minutes * 60 + seconds;
// //     initialTotal = totalSeconds;

// //     updateTimerDisplay();

// //     const hostControls = document.getElementById('host-controls');
// //     const timerContainer = document.getElementById('timer-container');
// //     const toggleButton = document.getElementById('toggle-controls');

// //     timerContainer.style.display = 'block';
// //     hostControls.style.visibility = 'visible';
// //     toggleButton.style.display = 'none';
// //     document.body.classList.remove("blackout");
// // }

// // // Start timer
// // function startTimer() {
// //     if (!isRunning && totalSeconds > 0) {
// //         isRunning = true;
// //         bellTime = parseInt(document.getElementById('bell-seconds').value); 
// //         timerInterval = setInterval(countDown, 1000);
        
// //         if (!audioContext) initAudio();
// //     }
// // }

// // // Pause timer
// // function pauseTimer() {
// //     clearInterval(timerInterval);
// //     isRunning = false;
// // }

// // // Reset timer
// // function resetTimer() {
// //     clearInterval(timerInterval);
// //     clearInterval(flashInterval);
// //     clearInterval(bellInterval);
// //     totalSeconds = initialTotal;
// //     isRunning = false;
// //     updateTimerDisplay();
// //     stopFlashing();

// //     const hostControls = document.getElementById('host-controls');
// //     const timerContainer = document.getElementById('timer-container');
// //     const toggleButton = document.getElementById('toggle-controls');

// //     timerContainer.style.display = 'block';
// //     hostControls.style.visibility = 'visible';
// //     toggleButton.style.display = 'none';
// //     document.body.classList.remove("blackout");
// // }

// // // Add 1 min
// // function addTime() {
// //     totalSeconds += 60;
// //     initialTotal += 60; 
// //     updateTimerDisplay();
// // }

// // // Subtract 1 min
// // function subtractTime() {
// //     totalSeconds = Math.max(0, totalSeconds - 60);
// //     initialTotal = Math.max(0, initialTotal - 60);
// //     updateTimerDisplay();
// // }

// // // Update timer display
// // function updateTimerDisplay() {
// //     const minutes = Math.floor(totalSeconds / 60);
// //     const seconds = totalSeconds % 60;
// //     const timerDisplay = document.getElementById('timer-display');

// //     if (totalSeconds > 0) {
// //         timerDisplay.style.fontSize = "450px"; 
// //         timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// //     } else {
// //         timerDisplay.style.fontSize = "200px";
// //         timerDisplay.textContent = "Time's Up!";
// //     }

// //     // Blackout logic
// //     if (totalSeconds <= initialTotal - 60 && totalSeconds > 300) {
// //         document.body.classList.add("blackout");
// //     } else {
// //         document.body.classList.remove("blackout");
// //     }
// // }

// // // Countdown
// // function countDown() {
// //     if (totalSeconds > 0) {
// //         totalSeconds--;
// //         updateTimerDisplay();

// //         const timerContainer = document.getElementById('timer-container');
// //         const hostControls = document.getElementById('host-controls');
// //         const toggleButton = document.getElementById('toggle-controls');

// //         // Visibility logic
// //         if (totalSeconds <= 300) { // last 5 min
// //             timerContainer.style.display = 'block';
// //             hostControls.style.visibility = 'visible';
// //             toggleButton.style.display = 'none';
// //             document.body.classList.remove("blackout");
// //         } else if (totalSeconds <= initialTotal - 60) { // after 1 min
// //             timerContainer.style.display = 'none';
// //             hostControls.style.visibility = 'hidden';
// //             toggleButton.style.display = 'block';
// //             document.body.classList.add("blackout");
// //         } else { // first minute
// //             timerContainer.style.display = 'block';
// //             hostControls.style.visibility = 'visible';
// //             toggleButton.style.display = 'none';
// //             document.body.classList.remove("blackout");
// //         }

// //         if (totalSeconds === bellTime) startBellAndFlashing();
// //         if (totalSeconds <= 5) startFlashing();

// //     } else {
// //         resetTimer();
// //         document.getElementById('timer-display').textContent = "Time's Up!";
// //     }
// // }

// // // Toggle host controls manually
// // function toggleControls() {
// //     const hostControls = document.getElementById('host-controls');
// //     const toggleButton = document.getElementById('toggle-controls');

// //     hostControls.style.visibility = 'visible';
// //     toggleButton.style.display = 'none';
// // }

// // // Start bell + flashing
// // function startBellAndFlashing() {
// //     bellInterval = setInterval(() => {
// //         if (totalSeconds > 0) playBellSound();
// //         else clearInterval(bellInterval);
// //     }, 1000);

// //     startFlashing();
// // }

// // // Manual bell
// // function playBellNow() {
// //     if (!audioContext) initAudio();
    
// //     let duration = 10; 
// //     playBellSound();

// //     bellInterval = setInterval(() => {
// //         if (duration > 1) { 
// //             playBellSound();
// //             duration--;
// //         } else {
// //             clearInterval(bellInterval);
// //             stopFlashing();
// //         }
// //     }, 1000);

// //     startFlashing();
// // }

// // // Flashing background
// // function startFlashing() {
// //     if (!flashInterval) {
// //         flashInterval = setInterval(() => {
// //             document.body.style.backgroundColor = 
// //                 document.body.style.backgroundColor === 'red' ? 'black' : 'red';
// //         }, 500);
// //     }
// // }

// // function stopFlashing() {
// //     clearInterval(flashInterval);
// //     flashInterval = null;
// //     document.body.style.backgroundColor = 'black';
// // }

// // // Initialize audio on page load
// // document.addEventListener('DOMContentLoaded', function() {
// //     // Will initialize audio on first user interaction
// // });




// let timerInterval;
// let totalSeconds = 0;
// let initialTotal = 0;
// let isRunning = false;
// let flashInterval;
// let bellInterval;
// let audioContext;

// // Initialize audio context for fallback beep
// function initAudio() {
//     try {
//         audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     } catch (e) {
//         console.log('Web Audio API not supported');
//     }
// }

// // Create a beep sound as fallback
// function createBeep(frequency = 800, duration = 200) {
//     if (!audioContext) return;

//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();

//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);

//     oscillator.frequency.value = frequency;
//     oscillator.type = 'sine';

//     gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

//     oscillator.start(audioContext.currentTime);
//     oscillator.stop(audioContext.currentTime + duration / 1000);
// }

// // Play bell sound
// function playBellSound() {
//     const bellSound = document.getElementById('bell-sound');
//     if (bellSound && bellSound.src) {
//         bellSound.play().catch(() => createBeep());
//     } else {
//         createBeep();
//     }
// }

// // Set timer
// function setTimer() {
//     const minutes = parseInt(document.getElementById('minutes').value) || 0;
//     const seconds = parseInt(document.getElementById('seconds').value) || 0;
//     totalSeconds = minutes * 60 + seconds;
//     initialTotal = totalSeconds;

//     updateTimerDisplay();

//     const hostControls = document.getElementById('host-controls');
//     const timerContainer = document.getElementById('timer-container');
//     const toggleButton = document.getElementById('toggle-controls');

//     timerContainer.style.display = 'block';
//     hostControls.style.visibility = 'visible';
//     toggleButton.style.display = 'none';
//     document.body.classList.remove("blackout");
// }

// // Start timer
// function startTimer() {
//     if (!isRunning && totalSeconds > 0) {
//         isRunning = true;
//         timerInterval = setInterval(countDown, 1000);

//         if (!audioContext) initAudio();
//     }
// }

// // Pause timer
// function pauseTimer() {
//     clearInterval(timerInterval);
//     isRunning = false;
// }

// // Reset timer
// function resetTimer() {
//     clearInterval(timerInterval);
//     clearInterval(flashInterval);
//     clearInterval(bellInterval);
//     totalSeconds = initialTotal;
//     isRunning = false;
//     updateTimerDisplay();
//     stopFlashing();

//     const hostControls = document.getElementById('host-controls');
//     const timerContainer = document.getElementById('timer-container');
//     const toggleButton = document.getElementById('toggle-controls');

//     timerContainer.style.display = 'block';
//     hostControls.style.visibility = 'visible';
//     toggleButton.style.display = 'none';
//     document.body.classList.remove("blackout");
// }

// // Add/Subtract time
// function addTime() { totalSeconds += 60; initialTotal += 60; updateTimerDisplay(); }
// function subtractTime() { totalSeconds = Math.max(0, totalSeconds - 60); initialTotal = Math.max(0, initialTotal - 60); updateTimerDisplay(); }

// // Update display
// function updateTimerDisplay() {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     const timerDisplay = document.getElementById('timer-display');

//     if (totalSeconds > 0) {
//         timerDisplay.style.fontSize = "450px";
//         timerDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
//     } else {
//         timerDisplay.style.fontSize = "200px";
//         timerDisplay.textContent = "Time's Up!";
//     }
// }

// // Countdown logic
// function countDown() {
//     if (totalSeconds > 0) {
//         totalSeconds--;
//         updateTimerDisplay();

//         const timerContainer = document.getElementById('timer-container');
//         const hostControls = document.getElementById('host-controls');
//         const toggleButton = document.getElementById('toggle-controls');

//         // Auto-hide/show logic
//         if (totalSeconds <= 300) { // last 5 minutes
//             timerContainer.style.display = 'block';
//             hostControls.style.visibility = 'visible';
//             toggleButton.style.display = 'none';
//             document.body.classList.remove("blackout");
//         } else if (totalSeconds <= initialTotal - 60) { // after 1 minute
//             timerContainer.style.display = 'none';
//             hostControls.style.visibility = 'hidden';
//             toggleButton.style.display = 'block';
//             document.body.classList.add("blackout");
//         } else { // first minute
//             timerContainer.style.display = 'block';
//             hostControls.style.visibility = 'visible';
//             toggleButton.style.display = 'none';
//             document.body.classList.remove("blackout");
//         }

//         // Automatic bell based on user input
//         const bellTime = parseInt(document.getElementById('bell-seconds').value);
//         if (totalSeconds === bellTime) {
//             startBellAndFlashing();
//         }

//         // Last 5 seconds flash
//         if (totalSeconds <= 5) startFlashing();

//     } else {
//         resetTimer();
//         document.getElementById('timer-display').textContent = "Time's Up!";
//     }
// }

// // Toggle host controls manually
// function toggleControls() {
//     const hostControls = document.getElementById('host-controls');
//     const toggleButton = document.getElementById('toggle-controls');

//     hostControls.style.visibility = 'visible';
//     toggleButton.style.display = 'none';
// }

// // Start bell + flashing
// function startBellAndFlashing() {
//     bellInterval = setInterval(() => {
//         if (totalSeconds > 0) playBellSound();
//         else clearInterval(bellInterval);
//     }, 1000);

//     startFlashing();
// }

// // Manual bell
// function playBellNow() {
//     if (!audioContext) initAudio();
//     let duration = 10;
//     playBellSound();

//     bellInterval = setInterval(() => {
//         if (duration > 1) { playBellSound(); duration--; }
//         else { clearInterval(bellInterval); stopFlashing(); }
//     }, 1000);

//     startFlashing();
// }

// // Flashing background
// function startFlashing() {
//     if (!flashInterval) {
//         flashInterval = setInterval(() => {
//             document.body.style.backgroundColor = document.body.style.backgroundColor === 'red' ? 'black' : 'red';
//         }, 500);
//     }
// }

// function stopFlashing() {
//     clearInterval(flashInterval);
//     flashInterval = null;
//     document.body.style.backgroundColor = 'black';
// }

// // Initialize audio
// document.addEventListener('DOMContentLoaded', function() { });


// let timerInterval;
// let totalSeconds = 0;
// let initialTotal = 0;
// let isRunning = false;
// let flashInterval;
// let bellInterval;
// let audioContext;
// let bellTriggered = false; // ensures bell triggers only once

// // Initialize audio context for fallback beep
// function initAudio() {
//     try {
//         audioContext = new (window.AudioContext || window.webkitAudioContext)();
//     } catch (e) {
//         console.log('Web Audio API not supported');
//     }
// }

// // Create a beep sound as fallback
// function createBeep(frequency = 800, duration = 200) {
//     if (!audioContext) return;

//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();

//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);

//     oscillator.frequency.value = frequency;
//     oscillator.type = 'sine';

//     gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

//     oscillator.start(audioContext.currentTime);
//     oscillator.stop(audioContext.currentTime + duration / 1000);
// }

// // Play bell sound
// function playBellSound() {
//     const bellSound = document.getElementById('bell-sound');
//     if (bellSound && bellSound.src) {
//         bellSound.play().catch(() => createBeep());
//     } else {
//         createBeep();
//     }
// }

// // Set timer
// function setTimer() {
//     const minutes = parseInt(document.getElementById('minutes').value) || 0;
//     const seconds = parseInt(document.getElementById('seconds').value) || 0;
//     totalSeconds = minutes * 60 + seconds;
//     initialTotal = totalSeconds;
//     bellTriggered = false; // reset bell flag

//     updateTimerDisplay();

//     const hostControls = document.getElementById('host-controls');
//     const timerContainer = document.getElementById('timer-container');
//     const toggleButton = document.getElementById('toggle-controls');

//     timerContainer.style.display = 'block';
//     hostControls.style.visibility = 'visible';
//     toggleButton.style.display = 'none';
//     document.body.classList.remove("blackout");
// }

// // Start timer
// function startTimer() {
//     if (!isRunning && totalSeconds > 0) {
//         isRunning = true;
//         timerInterval = setInterval(countDown, 1000);

//         if (!audioContext) initAudio();
//     }
// }

// // Pause timer
// function pauseTimer() {
//     clearInterval(timerInterval);
//     isRunning = false;
// }

// // Reset timer
// function resetTimer() {
//     clearInterval(timerInterval);
//     clearInterval(flashInterval);
//     clearInterval(bellInterval);
//     totalSeconds = initialTotal;
//     isRunning = false;
//     bellTriggered = false; // reset bell
//     updateTimerDisplay();
//     stopFlashing();

//     const hostControls = document.getElementById('host-controls');
//     const timerContainer = document.getElementById('timer-container');
//     const toggleButton = document.getElementById('toggle-controls');

//     timerContainer.style.display = 'block';
//     hostControls.style.visibility = 'visible';
//     toggleButton.style.display = 'none';
//     document.body.classList.remove("blackout");
// }

// // Add/Subtract time
// function addTime() { totalSeconds += 60; initialTotal += 60; updateTimerDisplay(); }
// function subtractTime() { totalSeconds = Math.max(0, totalSeconds - 60); initialTotal = Math.max(0, initialTotal - 60); updateTimerDisplay(); }

// // Update display
// function updateTimerDisplay() {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     const timerDisplay = document.getElementById('timer-display');

//     if (totalSeconds > 0) {
//         timerDisplay.style.fontSize = "450px";
//         timerDisplay.textContent = `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
//     } else {
//         timerDisplay.style.fontSize = "200px";
//         timerDisplay.textContent = "Time's Up!";
//     }
// }

// // Countdown logic
// function countDown() {
//     if (totalSeconds > 0) {
//         totalSeconds--;
//         updateTimerDisplay();

//         const timerContainer = document.getElementById('timer-container');
//         const hostControls = document.getElementById('host-controls');
//         const toggleButton = document.getElementById('toggle-controls');

//         // Auto-hide/show logic
//         if (totalSeconds <= 300) { // last 5 minutes
//             timerContainer.style.display = 'block';
//             hostControls.style.visibility = 'visible';
//             toggleButton.style.display = 'none';
//             document.body.classList.remove("blackout");
//         } else if (totalSeconds <= initialTotal - 60) { // after 1 minute
//             timerContainer.style.display = 'none';
//             hostControls.style.visibility = 'hidden';
//             toggleButton.style.display = 'block';
//             document.body.classList.add("blackout");
//         } else { // first minute
//             timerContainer.style.display = 'block';
//             hostControls.style.visibility = 'visible';
//             toggleButton.style.display = 'none';
//             document.body.classList.remove("blackout");
//         }

//         // Automatic bell based on user input
//         const bellTime = parseInt(document.getElementById('bell-seconds').value);
//         if (!isNaN(bellTime) && !bellTriggered && totalSeconds <= bellTime) {
//             bellTriggered = true;
//             startBellAndFlashing();
//         }

//         // Last 5 seconds flash
//         if (totalSeconds <= 5) startFlashing();

//     } else {
//         resetTimer();
//         document.getElementById('timer-display').textContent = "Time's Up!";
//     }
// }

// // Toggle host controls manually
// function toggleControls() {
//     const hostControls = document.getElementById('host-controls');
//     const toggleButton = document.getElementById('toggle-controls');

//     hostControls.style.visibility = 'visible';
//     toggleButton.style.display = 'none';
// }

// // Start bell + flashing for 5 seconds
// function startBellAndFlashing() {
//     if (!audioContext) initAudio();

//     let duration = 5; // ring for 5 seconds
//     playBellSound();

//     bellInterval = setInterval(() => {
//         if (duration > 1) {
//             playBellSound();
//             duration--;
//         } else {
//             clearInterval(bellInterval);
//             stopFlashing();
//         }
//     }, 1000);

//     startFlashing();
// }

// // Manual bell
// function playBellNow() {
//     if (!audioContext) initAudio();
//     let duration = 5;
//     playBellSound();

//     bellInterval = setInterval(() => {
//         if (duration > 1) {
//             playBellSound();
//             duration--;
//         } else {
//             clearInterval(bellInterval);
//             stopFlashing();
//         }
//     }, 1000);

//     startFlashing();
// }

// // Flashing background
// function startFlashing() {
//     if (!flashInterval) {
//         flashInterval = setInterval(() => {
//             document.body.style.backgroundColor = document.body.style.backgroundColor === 'red' ? 'black' : 'red';
//         }, 500);
//     }
// }

// function stopFlashing() {
//     clearInterval(flashInterval);
//     flashInterval = null;
//     document.body.style.backgroundColor = 'black';
// }

// // Initialize audio when DOM is ready
// document.addEventListener('DOMContentLoaded', function() { 
//     initAudio();
// });


// let timerInterval;
// let totalSeconds = 0;
// let isRunning = false;
// let bellTime = 10;
// let flashInterval;
// let bellInterval;

// // Function to set the initial timer values
// function setTimer() {
//     const minutes = parseInt(document.getElementById('minutes').value);
//     const seconds = parseInt(document.getElementById('seconds').value);
//     totalSeconds = minutes * 60 + seconds;
//     updateTimerDisplay();
// }

// // Function to start the timer countdown
// function startTimer() {
//     if (!isRunning && totalSeconds > 0) {
//         isRunning = true;
//         bellTime = parseInt(document.getElementById('bell-seconds').value); // Get the bell time
//         timerInterval = setInterval(countDown, 1000);
//     }
// }

// // Function to pause the timer
// function pauseTimer() {
//     clearInterval(timerInterval);
//     isRunning = false;
// }

// // Function to reset the timer
// function resetTimer() {
//     clearInterval(timerInterval);
//     clearInterval(flashInterval);
//     clearInterval(bellInterval);
//     totalSeconds = 0;
//     isRunning = false;
//     updateTimerDisplay();
//     stopFlashing();

//     // Always reset UI
//     document.getElementById('timer-container').style.display = 'block';
//     document.getElementById('host-controls').style.display = 'block';
// }

// // Function to add 1 minute to the timer
// function addTime() {
//     totalSeconds += 60;
//     updateTimerDisplay();
// }

// // Function to subtract 1 minute from the timer
// function subtractTime() {
//     totalSeconds = Math.max(0, totalSeconds - 60);
//     updateTimerDisplay();
// }

// // Function to update the displayed timer
// function updateTimerDisplay() {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
    
//     const timerDisplay = document.getElementById('timer-display');
    
//     if (totalSeconds > 0) {
//         timerDisplay.style.fontSize = "450px"; // Normal timer font size
//         timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     } else {
//         timerDisplay.style.fontSize = "200px"; // Smaller font for "Time's Up!" message
//         timerDisplay.textContent = "Time's Up!";
//     }
// }

// // Function to handle the countdown logic
// function countDown() {
//     if (totalSeconds > 0) {
//         totalSeconds--;
//         updateTimerDisplay();

//         // --- NEW UI LOGIC ---
//         const timerContainer = document.getElementById('timer-container');
//         const hostControls = document.getElementById('host-controls');

//         if (totalSeconds <= 65) {
//             // Show again in last 65 seconds
//             timerContainer.style.display = 'block';
//             hostControls.style.display = 'block';
//         } else if (totalSeconds <= (Math.max(0, totalSeconds) - 60)) {
//             // Hide after 1 minute has passed
//             timerContainer.style.display = 'none';
//             hostControls.style.display = 'none';
//         } else {
//             // Keep visible during the first minute
//             timerContainer.style.display = 'block';
//             hostControls.style.display = 'block';
//         }
//         // --- END UI LOGIC ---

//         // Trigger the bell and flashing together when the time reaches the bellTime
//         if (totalSeconds === bellTime) {
//             startBellAndFlashing();
//         }

//         // Ensure the flashing continues until the timer reaches zero
//         if (totalSeconds <= 5) {
//             startFlashing();
//         }

//     } else {
//         resetTimer();
//         document.getElementById('timer-display').textContent = "Time's Up!";
//     }
// }

// // Function to start the bell and flashing simultaneously
// function startBellAndFlashing() {
//     // Start the bell sound every second for the remaining time until zero
//     bellInterval = setInterval(() => {
//         if (totalSeconds > 0) {
//             document.getElementById('bell-sound').play();
//         } else {
//             clearInterval(bellInterval);
//         }
//     }, 1000);

//     // Start flashing the background
//     startFlashing();
// }

// // Manual bell play function with synchronized flashing for 10 seconds
// function playBellNow() {
//     let duration = 10; // Duration for the bell and flash
//     document.getElementById('bell-sound').play();

//     bellInterval = setInterval(() => {
//         if (duration > 1) {
//             document.getElementById('bell-sound').play();
//             duration--;
//         } else {
//             clearInterval(bellInterval);
//             stopFlashing(); // Stop flashing after 10 seconds
//         }
//     }, 1000);

//     startFlashing();
// }

// // Function to start flashing background color
// function startFlashing() {
//     if (!flashInterval) {
//         flashInterval = setInterval(() => {
//             document.body.style.backgroundColor = 
//                 document.body.style.backgroundColor === 'red' ? 'black' : 'red';
//         }, 500);
//     }
// }

// // Stop flashing and reset background color to black
// function stopFlashing() {
//     clearInterval(flashInterval);
//     flashInterval = null;
//     document.body.style.backgroundColor = 'black';
// }


// let timerInterval;
// let totalSeconds = 0;
// let isRunning = false;
// let bellTime = 10;
// let flashInterval;
// let bellInterval;

// // Function to set the initial timer values
// function setTimer() {
//     const minutes = parseInt(document.getElementById('minutes').value);
//     const seconds = parseInt(document.getElementById('seconds').value);
//     totalSeconds = minutes * 60 + seconds;
//     updateTimerDisplay();
// }

// // Function to start the timer countdown
// function startTimer() {
//     if (!isRunning && totalSeconds > 0) {
//         isRunning = true;
//         bellTime = parseInt(document.getElementById('bell-seconds').value); // Get the bell time
//         timerInterval = setInterval(countDown, 1000);
//     }
// }

// // Function to pause the timer
// function pauseTimer() {
//     clearInterval(timerInterval);
//     isRunning = false;
// }

// // Function to reset the timer
// function resetTimer() {
//     clearInterval(timerInterval);
//     clearInterval(flashInterval);
//     clearInterval(bellInterval);
//     totalSeconds = 0;
//     isRunning = false;
//     updateTimerDisplay();
//     stopFlashing();

//     // Always reset UI to visible
//     document.getElementById('timer-container').style.display = 'block';
//     document.getElementById('host-controls').style.display = 'block';
// }

// // Function to add 1 minute to the timer
// function addTime() {
//     totalSeconds += 60;
//     updateTimerDisplay();
// }

// // Function to subtract 1 minute from the timer
// function subtractTime() {
//     totalSeconds = Math.max(0, totalSeconds - 60);
//     updateTimerDisplay();
// }

// // Function to update the displayed timer
// function updateTimerDisplay() {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
    
//     const timerDisplay = document.getElementById('timer-display');
    
//     if (totalSeconds > 0) {
//         timerDisplay.style.fontSize = "450px"; // Normal timer font size
//         timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     } else {
//         timerDisplay.style.fontSize = "200px"; // Smaller font for "Time's Up!" message
//         timerDisplay.textContent = "Time's Up!";
//     }
// }

// // Function to handle the countdown logic
// function countDown() {
//     if (totalSeconds > 0) {
//         totalSeconds--;
//         updateTimerDisplay();

//         // --- NEW UI HIDING LOGIC ---
//         const timerContainer = document.getElementById('timer-container');
//         const hostControls = document.getElementById('host-controls');

//         if (totalSeconds <= 300 || totalSeconds > (initialTotalSeconds - 60)) {
//             // Show during first minute and last 5 minutes
//             timerContainer.style.display = 'block';
//             hostControls.style.display = 'block';
//         } else {
//             // Hide in between
//             timerContainer.style.display = 'none';
//             hostControls.style.display = 'none';
//         }
//         // --- END NEW UI HIDING LOGIC ---

//         // Trigger the bell and flashing together when the time reaches the bellTime
//         if (totalSeconds === bellTime) {
//             startBellAndFlashing();
//         }

//         // Ensure the flashing continues until the timer reaches zero
//         if (totalSeconds <= 5) {
//             startFlashing();
//         }

//     } else {
//         resetTimer();
//         document.getElementById('timer-display').textContent = "Time's Up!";
//     }
// }

// // Function to start the bell and flashing simultaneously
// function startBellAndFlashing() {
//     bellInterval = setInterval(() => {
//         if (totalSeconds > 0) {
//             document.getElementById('bell-sound').play();
//         } else {
//             clearInterval(bellInterval);
//         }
//     }, 1000);

//     startFlashing();
// }

// // Manual bell play function with synchronized flashing for 10 seconds
// function playBellNow() {
//     let duration = 10;
//     document.getElementById('bell-sound').play();

//     bellInterval = setInterval(() => {
//         if (duration > 1) {
//             document.getElementById('bell-sound').play();
//             duration--;
//         } else {
//             clearInterval(bellInterval);
//             stopFlashing();
//         }
//     }, 1000);

//     startFlashing();
// }

// // Function to start flashing background color
// function startFlashing() {
//     if (!flashInterval) {
//         flashInterval = setInterval(() => {
//             document.body.style.backgroundColor = 
//                 document.body.style.backgroundColor === 'red' ? 'black' : 'red';
//         }, 500);
//     }
// }

// // Stop flashing and reset background color to black
// function stopFlashing() {
//     clearInterval(flashInterval);
//     flashInterval = null;
//     document.body.style.backgroundColor = 'black';
// }

// // Track initial total time for UI logic
// let initialTotalSeconds = 0;
// function setTimer() {
//     const minutes = parseInt(document.getElementById('minutes').value);
//     const seconds = parseInt(document.getElementById('seconds').value);
//     totalSeconds = minutes * 60 + seconds;
//     initialTotalSeconds = totalSeconds; // store starting value
//     updateTimerDisplay();
// }




// let timerInterval;
// let totalSeconds = 0;
// let isRunning = false;
// let bellTime = 10;
// let flashInterval;
// let bellInterval;
// let initialTotalSeconds = 0;

// // Function to set the initial timer values
// function setTimer() {
//     const minutes = parseInt(document.getElementById('minutes').value);
//     const seconds = parseInt(document.getElementById('seconds').value);
//     totalSeconds = minutes * 60 + seconds;
//     initialTotalSeconds = totalSeconds; // store the original total
//     updateTimerDisplay();
// }

// // Function to start the timer countdown
// function startTimer() {
//     if (!isRunning && totalSeconds > 0) {
//         isRunning = true;
//         bellTime = parseInt(document.getElementById('bell-seconds').value); // Get the bell time
//         timerInterval = setInterval(countDown, 1000);
//     }
// }

// // Function to pause the timer
// function pauseTimer() {
//     clearInterval(timerInterval);
//     isRunning = false;
// }

// // Function to reset the timer
// function resetTimer() {
//     clearInterval(timerInterval);
//     clearInterval(flashInterval);
//     clearInterval(bellInterval);
//     totalSeconds = 0;
//     isRunning = false;
//     updateTimerDisplay();
//     stopFlashing();

//     // Always show controls again on reset
//     const hostControls = document.getElementById('host-controls');
//     const timerContainer = document.getElementById('timer-container');
//     hostControls.style.visibility = 'visible';
//     hostControls.style.pointerEvents = 'auto';
//     timerContainer.style.visibility = 'visible';
//     timerContainer.style.pointerEvents = 'auto';
// }

// // Function to add 1 minute to the timer
// function addTime() {
//     totalSeconds += 60;
//     updateTimerDisplay();
// }

// // Function to subtract 1 minute from the timer
// function subtractTime() {
//     totalSeconds = Math.max(0, totalSeconds - 60);
//     updateTimerDisplay();
// }

// // Function to update the displayed timer
// function updateTimerDisplay() {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
    
//     const timerDisplay = document.getElementById('timer-display');
    
//     if (totalSeconds > 0) {
//         timerDisplay.style.fontSize = "450px"; // Normal timer font size
//         timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//     } else {
//         timerDisplay.style.fontSize = "200px"; // Smaller font for "Time's Up!" message
//         timerDisplay.textContent = "Time's Up!";
//     }
// }

// // Function to handle the countdown logic
// function countDown() {
//     if (totalSeconds > 0) {
//         totalSeconds--;
//         updateTimerDisplay();
        
//         const hostControls = document.getElementById('host-controls');
//         const timerContainer = document.getElementById('timer-container');

//         // Visibility logic:
//         if (totalSeconds <= 300) { 
//             // Show in last 5 minutes
//             hostControls.style.visibility = 'visible';
//             hostControls.style.pointerEvents = 'auto';
//             timerContainer.style.visibility = 'visible';
//             timerContainer.style.pointerEvents = 'auto';
//         } else if (totalSeconds <= initialTotalSeconds - 60) { 
//             // Hide after the first minute
//             hostControls.style.visibility = 'hidden';
//             hostControls.style.pointerEvents = 'none';
//             timerContainer.style.visibility = 'hidden';
//             timerContainer.style.pointerEvents = 'none';
//         } else { 
//             // Show during the first minute
//             hostControls.style.visibility = 'visible';
//             hostControls.style.pointerEvents = 'auto';
//             timerContainer.style.visibility = 'visible';
//             timerContainer.style.pointerEvents = 'auto';
//         }

//         // Trigger the bell and flashing together when the time reaches the bellTime
//         if (totalSeconds === bellTime) {
//             startBellAndFlashing();
//         }

//         // Ensure the flashing continues until the timer reaches zero
//         if (totalSeconds <= 5) {
//             startFlashing();
//         }

//     } else {
//         resetTimer();
//         document.getElementById('timer-display').textContent = "Time's Up!";
//     }
// }

// // Function to start the bell and flashing simultaneously
// function startBellAndFlashing() {
//     bellInterval = setInterval(() => {
//         if (totalSeconds > 0) {
//             document.getElementById('bell-sound').play();
//         } else {
//             clearInterval(bellInterval);
//         }
//     }, 1000);

//     startFlashing();
// }

// // Manual bell play function with synchronized flashing for 10 seconds
// function playBellNow() {
//     let duration = 10; // Duration for the bell and flash

//     document.getElementById('bell-sound').play();

//     bellInterval = setInterval(() => {
//         if (duration > 1) { 
//             document.getElementById('bell-sound').play();
//             duration--;
//         } else {
//             clearInterval(bellInterval);
//             stopFlashing();
//         }
//     }, 1000);

//     startFlashing();
// }

// // Function to start flashing background color
// function startFlashing() {
//     if (!flashInterval) {
//         flashInterval = setInterval(() => {
//             document.body.style.backgroundColor = 
//                 document.body.style.backgroundColor === 'red' ? 'black' : 'red';
//         }, 500);
//     }
// }

// // Stop flashing and reset background color to black
// function stopFlashing() {
//     clearInterval(flashInterval);
//     flashInterval = null;
//     document.body.style.backgroundColor = 'black';
// }



let timerInterval;
let totalSeconds = 0;
let isRunning = false;
let bellTime = 10;
let flashInterval;
let bellInterval;
let initialTotalSeconds = 0;

// Function to set the initial timer values
function setTimer() {
    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);
    totalSeconds = minutes * 60 + seconds;
    initialTotalSeconds = totalSeconds; // store the original total
    updateTimerDisplay();
}

// Function to start the timer countdown
function startTimer() {
    if (!isRunning && totalSeconds > 0) {
        isRunning = true;
        bellTime = parseInt(document.getElementById('bell-seconds').value); // Get the bell time
        timerInterval = setInterval(countDown, 1000);
    }
}

// Function to pause the timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    clearInterval(flashInterval);
    clearInterval(bellInterval);
    totalSeconds = 0;
    isRunning = false;
    updateTimerDisplay();
    stopFlashing();

    // Always show timer again on reset
    const timerContainer = document.getElementById('timer-container');
    timerContainer.style.visibility = 'visible';
    timerContainer.style.pointerEvents = 'auto';
}

// Function to add 1 minute to the timer
function addTime() {
    totalSeconds += 60;
    updateTimerDisplay();
}

// Function to subtract 1 minute from the timer
function subtractTime() {
    totalSeconds = Math.max(0, totalSeconds - 60);
    updateTimerDisplay();
}

// Function to update the displayed timer
function updateTimerDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    const timerDisplay = document.getElementById('timer-display');
    
    if (totalSeconds > 0) {
        timerDisplay.style.fontSize = "450px"; // Normal timer font size
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        timerDisplay.style.fontSize = "200px"; // Smaller font for "Time's Up!" message
        timerDisplay.textContent = "Time's Up!";
    }
}

// Function to handle the countdown logic
function countDown() {
    if (totalSeconds > 0) {
        totalSeconds--;
        updateTimerDisplay();
        
        const timerContainer = document.getElementById('timer-container');

        // Visibility logic for the timer only
        if (totalSeconds <= 300) { 
            // Show in last 5 minutes
            timerContainer.style.visibility = 'visible';
            timerContainer.style.pointerEvents = 'auto';
        } else if (totalSeconds <= initialTotalSeconds - 60) { 
            // Hide after the first minute
            timerContainer.style.visibility = 'hidden';
            timerContainer.style.pointerEvents = 'none';
        } else { 
            // Show during the first minute
            timerContainer.style.visibility = 'visible';
            timerContainer.style.pointerEvents = 'auto';
        }

        // Trigger the bell and flashing together when the time reaches the bellTime
        if (totalSeconds === bellTime) {
            startBellAndFlashing();
        }

        // Ensure the flashing continues until the timer reaches zero
        if (totalSeconds <= 5) {
            startFlashing();
        }

    } else {
        resetTimer();
        document.getElementById('timer-display').textContent = "Time's Up!";
    }
}

// Function to start the bell and flashing simultaneously
function startBellAndFlashing() {
    bellInterval = setInterval(() => {
        if (totalSeconds > 0) {
            document.getElementById('bell-sound').play();
        } else {
            clearInterval(bellInterval);
        }
    }, 1000);

    startFlashing();
}

// Manual bell play function with synchronized flashing for 10 seconds
function playBellNow() {
    let duration = 10; // Duration for the bell and flash

    document.getElementById('bell-sound').play();

    bellInterval = setInterval(() => {
        if (duration > 1) { 
            document.getElementById('bell-sound').play();
            duration--;
        } else {
            clearInterval(bellInterval);
            stopFlashing();
        }
    }, 1000);

    startFlashing();
}

// Function to start flashing background color
function startFlashing() {
    if (!flashInterval) {
        flashInterval = setInterval(() => {
            document.body.style.backgroundColor = 
                document.body.style.backgroundColor === 'red' ? 'black' : 'red';
        }, 500);
    }
}

// Stop flashing and reset background color to black
function stopFlashing() {
    clearInterval(flashInterval);
    flashInterval = null;
    document.body.style.backgroundColor = 'black';
}


