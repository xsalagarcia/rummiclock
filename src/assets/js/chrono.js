
import {playersListItems, startNextButton, resetButton, turnTimeInput, pauseButton, accumulateCheckbox,
    deleteAllButton
} from "./html-elements.js";


startNextButton.addEventListener("click", nextTurn);
pauseButton.addEventListener("click", pauseGame);
resetButton.addEventListener("click", stopGame);


let activePlayer = null;

let playing = false;

let playerTimers = null;

let timerIntervalId = null

/**
 * Next turn at game.
 * @param {Event} event 
 */
function nextTurn(event) {

    if (!playing) {
        pauseButton.textContent = "Pausen";
        playing = true;
    }

    if (activePlayer != null){
        playersListItems[activePlayer].removeAttribute("active");
        activePlayer = (activePlayer + 1) % playersListItems.length
    }

    if (activePlayer == null && playersListItems.length > 1) {
        activePlayer = 0;
        startNextButton.textContent = "Següent";
        playing = true;
        playerTimers = new Array(playersListItems.length).fill(0);
    }

    playersListItems[activePlayer].setAttribute("active", "");
    if (accumulateCheckbox.checked)
        playerTimers[activePlayer] += Number(turnTimeInput.value) +1//+ playerTimers[activePlayer];
    
    playSound(440, 1);
    window.clearInterval(timerIntervalId);
    timerIntervalId = window.setInterval(timerFunction, 1000);
    timerFunction();

}

function stopGame(){
    window.clearInterval(timerIntervalId);

    activePlayer = null;
    playing = false;
    playerTimers = null;

    playersListItems.forEach((listItem)=>{
        listItem.querySelector(".timer").textContent = "00:00";
        listItem.removeAttribute("active");
    });
    startNextButton.textContent = "Inicia";
    pauseButton.textContent = "Pausen";
}

function pauseGame(){
    if (activePlayer == null)
        return;

    if (playing){
        window.clearInterval(timerIntervalId);
        pauseButton.textContent = "Continuen";
    } else {
        timerIntervalId = window.setInterval(timerFunction, 1000);
        pauseButton.textContent = "Pausen";
    }
    playing = !playing;
}

function timerFunction(){

    let seconds = playerTimers[activePlayer];
    if (seconds <= 0) {
        nextTurn();
        return;
    }

    if (seconds <= 10) {
        playSound();
    }
    playersListItems[activePlayer].querySelector(".timer").textContent = `${Math.floor(--seconds/60).toString().padStart(2, "0")}:${(seconds%60).toString().padStart(2, "0")}`;

    playerTimers[activePlayer] = seconds;
}

/**
 * 
 * @param {Number} frequency 
 * @param {Number} duration 
 * @param {String} type Can be 'sine', 'square', 'sawtooth', 'triangle'.
 */
function playSound(frequency = 440, duration = 0.5, type = "sine"){
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    oscillator.start();

    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    oscillator.stop(audioContext.currentTime + duration);
}

deleteAllButton.addEventListener("click", stopGame);

