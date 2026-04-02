/**
 * Player addition in the list. Remove all players in the list.
 */

import { playersList, updatePlayersList, removeDiv, listItemTemplate, deleteAllButton, playersListItems,
    startNextButton, pauseButton, resetButton
 } from "./html-elements.js";


const addPlayerInput = document.getElementById("add-player-input");
const playerForm = document.getElementById("player-form");

playerForm.addEventListener( "submit", (e) => {
    e.preventDefault();
    const clone = document.importNode(listItemTemplate.content, true);
    clone.querySelector(".player-name").textContent = addPlayerInput.value;
    playersList.insertBefore(clone, removeDiv);
    addPlayerInput.value = "";
    updatePlayersList();

});

deleteAllButton.addEventListener("click", ()=>{
    playersListItems.forEach(item => {
        item.remove();
    })
    updatePlayersList();
    startNextButton.textContent ="Inicia";
    pauseButton.textContent ="Pausen";
    resetButton.textContent ="Restableix";
});

