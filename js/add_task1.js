// Prio Button Color function //

/**
 * Updates the priority button colors and sets the task priority based on the selected priority.
 * 
 * This function handles the priority button click event, preventing the default action and updating
 * the button colors and icons to reflect the selected priority. It also updates the `newTask` object
 * with the selected priority.
 * 
 * @function addPrioButtonColor
 * @param {string} prio - The priority level ("urgent", "medium", or "low").
 * @param {Event} event - The click event.
 * @returns {void}
 */
function addPrioButtonColor(prio, event) {
    event.preventDefault();
    let buttonUrgent = document.getElementById("buttonUrgent");
    let buttonMedium = document.getElementById("buttonMedium");
    let buttonLow = document.getElementById("buttonLow");
    let imgUrgent = document.getElementById("buttonImg1");
    let imgMedium = document.getElementById("buttonImg2");
    let imgLow = document.getElementById("buttonImg3");
    removeClasses(buttonUrgent, buttonMedium, buttonLow, imgUrgent, imgMedium, imgLow);
    if (prio === "urgent") {
        selectedButtonColor(buttonUrgent, imgUrgent, "backgroundColorRed", "urgent");
        newTask['priority'] = "urgent";
    } else if (prio === "medium") {
        selectedButtonColor(buttonMedium, imgMedium, "backgroundColorOrange", "medium");
        newTask['priority'] = "medium";
    } else if (prio === "low") {
        selectedButtonColor(buttonLow, imgLow, "backgroundColorGreen", "low");
        newTask['priority'] = "low";
    }
}


/**
 * Removes specific CSS classes from the priority buttons and resets their icons.
 * 
 * This function is used to reset the appearance of the priority buttons to their default state
 * by removing color classes and updating the icon images.
 * 
 * @function removeClasses
 * @param {HTMLElement} buttonUrgent - The "urgent" priority button element.
 * @param {HTMLElement} buttonMedium - The "medium" priority button element.
 * @param {HTMLElement} buttonLow - The "low" priority button element.
 * @param {HTMLImageElement} imgUrgent - The image element within the "urgent" button.
 * @param {HTMLImageElement} imgMedium - The image element within the "medium" button.
 * @param {HTMLImageElement} imgLow - The image element within the "low" button.
 * @returns {void}
 */
function removeClasses(buttonUrgent, buttonMedium, buttonLow, imgUrgent, imgMedium, imgLow) {
    buttonUrgent.classList.remove("backgroundColorRed", "buttonPrioWhite");
    buttonMedium.classList.remove("backgroundColorOrange", "buttonPrioWhite");
    buttonLow.classList.remove("backgroundColorGreen", "buttonPrioWhite");
    imgUrgent.src = "../assets/img/addTaskUrgentLogo.svg";
    imgMedium.src = "../assets/img/addTaskMediumLogo.svg";
    imgLow.src = "../assets/img/addTaskLowLogo.svg";
}

/**
 * Adds specific CSS classes to the selected priority button and updates its icon.
 * 
 * This function is used to change the appearance of the selected priority button to indicate
 * its active state by adding color classes and updating the icon image.
 * 
 * @function selectedButtonColor
 * @param {HTMLElement} button - The priority button element to update.
 * @param {HTMLImageElement} img - The image element within the button.
 * @param {string} colorClass - The CSS class for the background color.
 * @param {string} priority - The priority level ("urgent", "medium", or "low").
 * @returns {void}
 */
function selectedButtonColor(button, img, colorClass, priority) {
    button.classList.add(colorClass, "buttonPrioWhite");
    img.src = `../assets/img/addTask${capitalizeFirstLetter(priority)}LogoWhite.svg`;
}

/**
 * Capitalizes the first letter of the given string.
 * 
 * This function is a utility to capitalize the first letter of a string, often used for
 * formatting purposes.
 * 
 * @function capitalizeFirstLetter
 * @param {string} string - The string to capitalize.
 * @returns {string} The capitalized string.
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Sets the medium priority button to the active state with orange color and white text.
 * 
 * This function is used to initialize the medium priority button with the active style
 * and updates the icon image accordingly. It also sets the `newTask` priority to "medium".
 * 
 * @function ButtonMediumInOrange
 * @returns {void}
 */
function ButtonMediumInOrange() {
    let buttonMedium = document.getElementById("buttonMedium");
    let imgMedium = document.getElementById("buttonImg2");
    buttonMedium.classList.add("backgroundColorOrange", "buttonPrioWhite");
    imgMedium.src = "../assets/img/addTaskMediumLogoWhite.svg";
    newTask['priority'] = "medium";
}

// Min DayDate //

/**
 * Sets the minimum date for the "Due Date" input field to today's date.
 * 
 * This function retrieves the current date, formats it to "YYYY-MM-DD",
 * and sets it as the minimum value for the "Due Date" input field to ensure
 * that users cannot select a past date.
 * 
 * @function setEditDueDateMinDate
 * @returns {void}
 */
function setEditDueDateMinDate() {
    let today = new Date();

    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let formattedDate = yyyy + '-' + mm + '-' + dd;

    document.getElementById('editDueDate').setAttribute('min', formattedDate);
}

// Assigned To Section //

/**
 * Renders the choosing list of contacts for a given task.
 * 
 * This function populates the choosing list with contacts, displaying their icons,
 * initials, and names. Each contact is clickable, allowing the user to toggle the
 * assignment of the contact to the task.
 * 
 * @function renderChoosingList
 * @param {number} taskId - The ID of the task for which the choosing list is rendered.
 * @returns {void}
 */
function renderChoosingList(taskId) {
    document.getElementById('choosingList').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let color = contact['color'].replace("#", "C");
        document.getElementById('choosingList').innerHTML += /*html*/`
        <div class="choosingListRow" onclick="event.stopPropagation(), toggleAssigned(${contact['id']})" id="choosingListRow${contact['id']}">
            <div class="choosingListLeft">
                <div class="choosingListUserIcon ${color}">
                    <div class="choosingListUserInitials">${contact['initials']}</div>
                </div>
                <div>${contact['name']}</div>
            </div>
            <div class="choosingListCheck completedFalse" id="choosingListCheckImg${contact['id']}"></div>
        </div>
        `;
    }
}

/**
 * Toggles the visibility of the choosing list.
 * 
 * This function shows or hides the choosing list of contacts by adding or removing
 * the 'dnone' class. It also rotates the icon to indicate the list's visibility state.
 * 
 * @function toggleShowChoosingList
 * @returns {void}
 */
function toggleShowChoosingList() {
    let list = document.getElementById('choosingList');
    if (list.classList.contains('dnone')) {
        list.classList.remove('dnone');
        document.getElementById('openCloseChoosingListImg').classList.add('rotate180');
    } else {
        list.classList.add('dnone');
        document.getElementById('openCloseChoosingListImg').classList.remove('rotate180');
    }
}

/**
 * Toggles the assignment of a contact to the task.
 * 
 * This function adds or removes a contact from the task's assigned contacts list based
 * on the contact's ID. It updates the contact's selection state and re-renders the
 * assigned contacts list.
 * 
 * @function toggleAssigned
 * @param {number} contactId - The ID of the contact to toggle.
 * @returns {void}
 */
function toggleAssigned(contactId) {
    let contactIndex = newTask['assignedTo'].indexOf(Number(contactId));
    if (!newTask.assignedTo) {
        newTasktask.assignedTo = [];
    }
    if (contactIndex === -1) {
        document.getElementById(`choosingListCheckImg${contactId}`).classList.remove('completedFalse');
        document.getElementById(`choosingListCheckImg${contactId}`).classList.add('completedTrue');
        newTask['assignedTo'].push(Number(contactId));
    } else {
        document.getElementById(`choosingListCheckImg${contactId}`).classList.remove('completedTrue');
        document.getElementById(`choosingListCheckImg${contactId}`).classList.add('completedFalse');
        newTask['assignedTo'].splice(contactIndex, 1);
    }

    renderAssignedTosEdit(newTask.id);
}

//function toggleAssigned(contactId, taskId) {
//    let task = tasks.find(task => task.id === taskId);
//    if (!task.assignedTo) {
//        task.assignedTo = [];
//    }
//    let isAssigned = task.assignedTo.includes(Number(contactId));
//    let checkImg = document.getElementById(`choosingListCheckImg${contactId}`);
//    if (isAssigned) {
//        task.assignedTo = task.assignedTo.filter(id => id !== Number(contactId));
//        checkImg.classList.add('completedFalse');
//        checkImg.classList.remove('completedTrue');
//    } else {
//        task.assignedTo.push(Number(contactId));
//        checkImg.classList.add('completedTrue');
//        checkImg.classList.remove('completedFalse');
//    }
//    renderAssignedTosEdit(taskId);
//}

/**
 * Filters the contacts in the choosing list based on the search input.
 * 
 * This function filters the contacts displayed in the choosing list by their names
 * based on the user's search input, showing only those that match the search query.
 * 
 * @function editFilterNames
 * @returns {void}
 */
function editFilterNames() {
    let search = document.getElementById('contactsDropDown').value.toLowerCase();
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i]['name'].toLowerCase().includes(search)) {
            document.getElementById(`choosingListRow${contacts[i]['id']}`).style = "display: flex";
        } else {
            document.getElementById(`choosingListRow${contacts[i]['id']}`).style = "display: none";
        }
    }
}

/**
 * Renders the list of assigned contacts for editing.
 * 
 * This function displays the icons and initials of contacts assigned to the task
 * in the assigned contacts section, allowing the user to see and manage the assigned contacts.
 * 
 * @function renderAssignedTosEdit
 * @param {number} taskId - The ID of the task for which the assigned contacts are rendered.
 * @returns {void}
 */
function renderAssignedTosEdit(taskId) {
    let assignedTos = newTask['assignedTo'];
    document.getElementById(`editAssignedTosChosenEdit`).innerHTML = ``;

    if (assignedTos) {
        for (let i = 0; i < assignedTos.length; i++) {
            let userId = assignedTos[i];
            let contact = contacts.find(contact => contact.id === userId);
            if (contact) {
                let color = contact['color'].replace("#", 'C');
                document.getElementById(`editAssignedTosChosenEdit`).innerHTML += /*html*/ `
                <div class="choosingListUserIcon ${color}" id="userIconEdit${i}">
                    <div class="choosingListUserInitials">${contact['initials']}</div>
                </div>
                `;
            }
        }
    }
}

/**
 * Shows the choosing list of contacts.
 * 
 * This function makes the choosing list of contacts visible by removing the 'dnone' class
 * and rotates the icon to indicate the list's visibility state.
 * 
 * @function showChoosingList
 * @returns {void}
 */
function showChoosingList() {
    let list = document.getElementById('choosingList');
    list.classList.remove('dnone');
    document.getElementById('openCloseChoosingListImg').classList.add('rotate180');
}


/**
 * Hides the choosing list and resets the rotation of the toggle icon to indicate a closed state.
 *
 * This function hides the choosing list by adding the 'dnone' class and updates the toggle icon
 * by removing the 'rotate180' class to indicate that the list is closed. It first checks if the 
 * choosing list element exists before making changes.
 *
 * @returns {void}
 *
 * @example
 * // Hide the choosing list and reset the toggle icon rotation
 * closeChoosingList();
 */
function closeChoosingList() {
    if (document.getElementById('choosingList')) {
        document.getElementById('choosingList').classList.add('dnone');
        document.getElementById('openCloseChoosingListImg').classList.remove('rotate180');
    }
}