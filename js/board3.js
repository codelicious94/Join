/**
 * Renders an edit input for a sub-task, allowing the user to modify its content.
 *
 * This function replaces the existing HTML of a sub-task's row with an input field where the user can rename the sub-task.
 * It also adds buttons for deleting or saving the changes to the sub-task. The current sub-task name is preloaded into the input field.
 *
 * @param {number|string} taskId - The unique identifier of the task that contains the sub-task to be edited.
 * @param {number|string} subTaskId - The unique identifier of the sub-task to be edited.
 * 
 * @returns {void}
 * 
 * @example
 * // Render the edit input for sub-task with ID 456 in the task with ID 123
 * editEditSubTask(123, 456);
 */
function editEditSubTask(taskId, subTaskId) {
    let preloadedValue = document.getElementById(`subTaskName${subTaskId}`).innerHTML;
    document.getElementById(`subTaskEditRow${subTaskId}`).innerHTML =/*html*/`
        <div class="editSubTaskInputContainer">
            <input class="editSubTaskEditInput" id="editSubTaskInput${subTaskId}" type="text" minlength="5" maxlength="25" placeholder="Rename subtask">
            <div class="subTaskEditEditRowRight">
                <img class="editSubTaskEditImg" src="../assets/img/delete.svg" alt="" onclick="event.stopPropagation(), deleteEditSubTask(${taskId},${subTaskId})">
                <div class="editSubTaskSeparator"></div>
                <img class="editSubTaskEditImg" src="../assets/img/checkEditTaskBright.svg" alt="" onclick="event.stopPropagation(), changeEditSubTaskContent(${taskId},${subTaskId})">
            </div>
        </div>
    `;
    document.getElementById(`editSubTaskInput${subTaskId}`).value = preloadedValue.substring(2);
}


/**
 * Updates the content of a specific sub-task with new values provided by the user.
 *
 * This function finds the specified task and sub-task, then updates the sub-task's content based on the value entered by the user.
 * If the task or sub-task is not found, it logs an appropriate message to the console.
 * After updating the sub-task content, it re-renders the list of sub-tasks to reflect the changes.
 *
 * @param {number|string} taskId - The unique identifier of the task that contains the sub-task to be updated.
 * @param {number|string} subTaskId - The unique identifier of the sub-task to be updated.
 *
 * @returns {void}
 * 
 * @example
 * // Change the content of sub-task with ID 456 in the task with ID 123
 * changeEditSubTaskContent(123, 456);
 */
function changeEditSubTaskContent(taskId, subTaskId) {
    let task = tasks.find(task => task.id === taskId);
    if (task) {
        let subTask = task.subTasks.find(subTask => subTask.id === subTaskId);
        if (subTask) {
            let newContent = document.getElementById(`editSubTaskInput${subTaskId}`).value;
            subTask.content = newContent;
        } else {
            console.log(`Subtask with id ${subTaskId} not found.`);
        }
    } else {
        console.log(`Task with id ${taskId} not found.`);
    }
    renderSubtasksEdit(taskId);
}


/**
 * Adds a focus style to the specified input container by applying a CSS class.
 *
 * This function sets the border color of an input container to indicate that it is in focus.
 * It achieves this by adding the `inputContainerFocus` CSS class to the element with the given ID.
 *
 * @param {string} inputContainerId - The ID of the input container element to which the focus style should be applied.
 */
function setInputContainerBorderColor(inputContainerId) {
    document.getElementById(`${inputContainerId}`).classList.add('inputContainerFocus');
}


/**
 * Adds a CSS class to the specified input container element to apply a focus style.
 *
 * This function modifies the appearance of the input container by adding the `inputContainerFocus` 
 * class to the element with the provided ID. This is typically used to visually indicate focus or 
 * active state for user input elements.
 *
 * @param {string} inputContainerId - The ID of the input container element to which the CSS class will be added.
 *
 * @returns {void}
 *
 * @example
 * // Add focus style to the input container with ID 'usernameInputContainer'
 * setInputContainerBorderColor('usernameInputContainer');
 */
function setInputContainerBorderColor(inputContainerId) {
    document.getElementById(`${inputContainerId}`).classList.add('inputContainerFocus');
}


/**
 * Removes the CSS class from the specified input container element to reset its border color.
 *
 * This function removes the `inputContainerFocus` class from the element with the provided ID, 
 * which typically resets the visual indication of focus or active state for user input elements.
 *
 * @param {string} inputContainerId - The ID of the input container element from which the CSS class will be removed.
 *
 * @returns {void}
 *
 * @example
 * // Remove focus style from the input container with ID 'usernameInputContainer'
 * resetInputContainerBorderColor('usernameInputContainer');
 */
function resetInputContainerBorderColor(inputContainerId) {
    document.getElementById(`${inputContainerId}`).classList.remove('inputContainerFocus');
}


/**
 * Validates the title input field to ensure it meets specified length requirements.
 *
 * This function checks the value of the input field with ID 'editTitle'. The title must be 
 * at least 3 characters long and no more than 40 characters. If the title is valid, any 
 * previous custom validity message is cleared. If the title is invalid, a custom validity 
 * message is set, which will be used by form validation to inform the user.
 *
 * @returns {void}
 *
 * @example
 * // Call the function to validate the title input field
 * validateTitle();
 */
function validateTitle() {
    let input = document.getElementById('editTitle');
    let title = input.value.trim();
    let titlePattern = /^.{3,40}$/;
    if (titlePattern.test(title)) {
        input.setCustomValidity(''); // Gültiger Titel, keine Fehlermeldung
    } else {
        input.setCustomValidity('The title must be at least 3 characters long and max 40 characters long.');
    }
}


/**
 * Validates the description input field to ensure it meets specified length requirements.
 *
 * This function checks the value of the input field with ID 'editDescription'. The description 
 * must be at least 3 characters long and no more than 200 characters. If the description is 
 * valid, any previous custom validity message is cleared. If the description is invalid, a custom 
 * validity message is set, which will be used by form validation to inform the user.
 *
 * @returns {void}
 *
 * @example
 * // Call the function to validate the description input field
 * validateDescription();
 */
function validateDescription() {
    let input = document.getElementById('editDescription');
    let description = input.value.trim();
    let descriptionPattern = /^.{3,200}$/;
    if (descriptionPattern.test(description)) {
        input.setCustomValidity(''); // Gültiger Titel, keine Fehlermeldung
    } else {
        input.setCustomValidity('The title must be at least 3 characters long and max 200 characters long.');
    }
}


/**
 * Updates the status of a task by moving it one step down in the workflow.
 *
 * This function changes the status of the task identified by `taskId` as follows:
 * - If the status is 'inProgress', it changes to 'toDo'.
 * - If the status is 'awaitingFeedback', it changes to 'inProgress'.
 * - If the status is 'done', it changes to 'awaitingFeedback'.
 *
 * After updating the status, it calls `saveTasks` to persist the changes
 * and `renderTasksBoard` to update the user interface.
 *
 * @param {number} taskId - The unique identifier of the task to update.
 */
function statusOneDown(taskId) {
    let task = tasks.find(task => task.id === taskId);
    if (task['status'] == 'inProgress') {
        task['status'] = 'toDo';
    } else if (task['status'] == 'awaitingFeedback') {
        task['status'] = 'inProgress';
    } else if (task['status'] == 'done') {
        task['status'] = 'awaitingFeedback';
    }
    saveTasks();
    renderTasksBoard();
}


/**
 * Updates the status of a task by moving it one step up in the workflow.
 *
 * This function changes the status of the task identified by `taskId` as follows:
 * - If the status is 'toDo', it changes to 'inProgress'.
 * - If the status is 'inProgress', it changes to 'awaitingFeedback'.
 * - If the status is 'awaitingFeedback', it changes to 'done'.
 *
 * After updating the status, it calls `saveTasks` to persist the changes
 * and `renderTasksBoard` to update the user interface.
 *
 * @param {number} taskId - The unique identifier of the task to update.
 */
function statusOneUp(taskId) {
    let task = tasks.find(task => task.id === taskId);
    if (task['status'] == 'toDo') {
        task['status'] = 'inProgress';
    } else if (task['status'] == 'inProgress') {
        task['status'] = 'awaitingFeedback';
    } else if (task['status'] == 'awaitingFeedback') {
        task['status'] = 'done';
    }
    saveTasks();
    renderTasksBoard();
}


/**
 * Updates the visibility of arrow icons based on the task's status.
 *
 * This function modifies the visibility of up and down arrow elements for a task
 * identified by `taskId`. It hides the up arrow if the task status is 'toDo' and
 * hides the down arrow if the task status is 'done'.
 *
 * - If the status is 'toDo', the up arrow element identified by `arrowUp${taskId}`
 *   will have the 'dnone' class added to hide it.
 * - If the status is 'done', the down arrow element identified by `arrowDown${taskId}`
 *   will have the 'dnone' class added to hide it.
 *
 * @param {number} taskId - The unique identifier of the task whose arrows are being updated.
 */
function changeArrows(taskId){
    let task = tasks.find(task => task.id === taskId);
    if (task['status'] == 'toDo'){
        document.getElementById(`arrowUp${taskId}`).classList.add('dnone');
    }
    if (task['status'] == 'done'){
        document.getElementById(`arrowDown${taskId}`).classList.add('dnone');
    }
}


/**
 * Updates the display of assigned users for a specific task.
 *
 * This function clears the current display of assigned users for a task and populates it
 * with new user information based on the provided list of user IDs. Each assigned user is 
 * displayed with a color-coded icon and their initials.
 *
 * @param {string} taskId - The unique identifier for the task. This is used to construct
 *   the IDs of the HTML elements that represent the assigned users' icons and initials.
 * @param {Array<string>|undefined} [assignedTos] - An optional array of user IDs representing
 *   the users assigned to the task. If provided, each user is displayed with their initials
 *   and a color-coded icon. If `assignedTos` is `undefined` or an empty array, no users will 
 *   be displayed.
 *
 * @example
 * // Update assigned users for a task with ID 'task1'
 * changeAssignedTos('task1', ['user1', 'user2']);
 *
 * @example
 * // Clear assigned users display for a task with ID 'task2'
 * changeAssignedTos('task2');
 */
function changeAssignedTos(taskId, assignedTos) {
    document.getElementById(`assignedTo${taskId}`).innerHTML = ``;
    if (assignedTos && assignedTos.length > 0) {
        let numberOfEntries = Math.min(assignedTos.length, 4);
        for (let i = 0; i < numberOfEntries; i++) {
            let userId = assignedTos[i];
            let contact = findContactById(contacts, userId);
            document.getElementById(`assignedTo${taskId}`).innerHTML += changeAssignedTosHTML(taskId, i);
            let color = contact['color'];
            document.getElementById(`userIcon${taskId}${i}`).classList.add(`${color}`.replace("#", 'C'));
            document.getElementById(`userInitials${taskId}${i}`).innerHTML = `${contact['initials']}`;
        }
        if (assignedTos.length > 4) {
            hideMoreThanFourAndRenderOneEmpty(taskId);
            document.getElementById(`plusNumber${taskId}`).innerHTML = `+${assignedTos.length - 4}`;
        }
    }
}


/**
 * Appends a placeholder to indicate there are more than four assigned users.
 * This function updates the HTML content of the assigned users container
 * to show that there are more users assigned than displayed.
 *
 * @param {string|number} taskId - The unique identifier of the task. This ID is used
 * to target the specific HTML element associated with the task.
 */
function hideMoreThanFourAndRenderOneEmpty(taskId) {
    document.getElementById(`assignedTo${taskId}`).innerHTML += hideMoreThanFourAndRenderOneEmptyHTML(taskId);
}