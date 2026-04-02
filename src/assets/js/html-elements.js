const playersList = document.getElementById("players-list");
let playersListItems = playersList.querySelectorAll("li");
const removeDiv = document.getElementById("remove-div");
const listItemTemplate = document.getElementById("list-item-template");
const startNextButton = document.getElementById("start-next-button");
const accumulateCheckbox = document.getElementById("accumulate-checkbox");
const resetButton = document.getElementById("reset-button");
const turnTimeInput = document.getElementById("turn-time-input");
const pauseButton = document.getElementById("pause-button");
const deleteAllButton = document.getElementById("delete-all-button");

function updatePlayersList(){
    playersListItems = playersList.querySelectorAll("li");
}


export {playersList, playersListItems, updatePlayersList, removeDiv, listItemTemplate,
    startNextButton, accumulateCheckbox, resetButton, turnTimeInput, pauseButton, deleteAllButton
};