/**
 * Dragging actions on the list.
 */

import { playersList, playersListItems, removeDiv, updatePlayersList } from "./html-elements.js";

let draggingElement;

//When the dragging action starts, add dragging class to the dragging item.
playersList.addEventListener("dragstart", (e) => {
    draggingElement = e.target;
    draggingElement.classList.add("dragging");
    removeDiv.classList.add("visible");

});

//When the item is dragged over the list
playersList.addEventListener("dragover", (e) => {
    e.preventDefault(); // This is necessary to allow drop action.
    const afterElement = e.target.nextElementSibling;
    let underElement = null;

    // From the whole list, get the element under the dragging element.
    for (const element of playersListItems){
        if (isTheElementContainingTheCoordinates(element, e.clientX, e.clientY)) {
            underElement = element;
            break;
        }
    }

    if (underElement != null) {
        changeElementsOrder(underElement, draggingElement);
    }
    if (isTheElementContainingTheCoordinates(removeDiv, e.clientX, e.clientY)){
        removeDiv.classList.add("focused");
    } else {
        removeDiv.classList.remove("focused");
    }

})

// Clean up styles on drop
playersList.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    if (isTheElementContainingTheCoordinates(removeDiv, e.clientX, e.clientY)){
        e.target.remove();
    }
    removeDiv.classList.remove("visible");

});


/**
 * Checks if a specific set of coordinates falls within the bounding box of the element.
 * @param {HTMLElement} element
 * @param {number} x
 * @param {number} y
 * @returns {boolean} True if the coordinates are within the elements bounds
 * */
function isTheElementContainingTheCoordinates(element, x, y){
    const rect = element.getBoundingClientRect();
    return (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
    );
}

/**
 * Change the elements order.
 * @param {HTMLElement} underElement
 * @param {HTMLElement} draggingElement
 * */
function changeElementsOrder(underElement, draggingElement) {
        if (underElement.nextElementSibling) {
            if (draggingElement.compareDocumentPosition(underElement) & Node.DOCUMENT_POSITION_FOLLOWING)
                playersList.insertBefore(underElement, draggingElement);

            else{
                playersList.insertBefore(draggingElement, underElement);
            }
        }
        else {
            playersList.appendChild(draggingElement)
        }
        updatePlayersList();
}
