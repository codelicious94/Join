/**
 * Sets the priority of a task to 'low' and updates the UI accordingly.
 *
 * This function changes the priority of the specified task to 'low' and visually updates
 * the edit form to reflect this priority selection. It highlights the 'low' priority choice,
 * while removing any highlight from other priority options ('urgent' and 'medium').
 *
 * @param {string} taskId - The unique identifier of the task whose priority is to be set to 'low'.
 *
 * @returns {void}
 *
 * @example
 * // Set the priority of the task with ID 'task123' to 'low'
 * changeChosenPriorityToLow('task123');
 */
function changeChosenPriorityToLow(taskId) {
    chosenPriority = 'low';
    let task = tasks.find(task => task.id === taskId);
    task['priority'] = 'low';
    document.getElementById('prioritySubLow').classList.add('backgroundColorLow');
    document.getElementById('editPriorityLowImg').classList.add('whiteningFilter');
    document.getElementById('prioritySubMedium').classList.remove('backgroundColorMedium');
    document.getElementById('editPriorityMediumImg').classList.remove('whiteningFilter');
    document.getElementById('prioritySubUrgent').classList.remove('backgroundColorUrgent');
    document.getElementById('editPriorityUrgentImg').classList.remove('whiteningFilter');
}


/**
 * Toggles the visibility of the choosing list and updates the rotation of the toggle icon.
 *
 * This function checks whether the choosing list is currently visible or hidden. If the list
 * is hidden, it shows the list and rotates the toggle icon to indicate an open state. If the list
 * is visible, it hides the list and resets the icon rotation to indicate a closed state.
 *
 * @returns {void}
 *
 * @example
 * // Toggle the visibility of the choosing list and update the icon rotation
 * toggleShowChoosingList();
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
 * Displays the choosing list and rotates the toggle icon to indicate an open state.
 *
 * This function makes the choosing list visible by removing the 'dnone' class and updates the 
 * toggle icon by adding the 'rotate180' class to indicate that the list is open.
 *
 * @returns {void}
 *
 * @example
 * // Show the choosing list and rotate the toggle icon to indicate the list is open
 * showChoosingList();
 */
function showChoosingList() {
    document.getElementById('choosingList').classList.remove('dnone');
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


/**
 * Renders the choosing list with contact options for a specific task.
 *
 * This function populates the choosing list with options based on the available contacts. For each
 * contact, it adds an entry to the choosing list using the `renderChoosingListHTML` function. Additionally,
 * it updates each entry to reflect whether the contact is assigned to the task using the `fillAssigned` function.
 *
 * @param {string} taskId - The unique identifier of the task for which the choosing list is being rendered.
 *
 * @returns {void}
 *
 * @example
 * // Render the choosing list for the task with ID 'task123'
 * renderChoosingList('task123');
 */
function renderChoosingList(taskId) {
    document.getElementById('choosingList').innerHTML = ``;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        let color = contact['color'].replace("#", "C");
        document.getElementById('choosingList').innerHTML += renderChoosingListHTML(taskId, color, contact);
        fillAssigned(contact, taskId);
    }
}


/**
 * Updates the checkmark status for a contact in the choosing list based on task assignment.
 *
 * This function updates the visual checkmark for a contact in the choosing list to reflect whether 
 * the contact is assigned to a specific task. It checks if the contact's ID is present in the task's 
 * `assignedTo` list and adjusts the CSS classes for the checkmark accordingly.
 *
 * @param {Object} contact - The contact object containing details about the contact.
 * @param {string} taskId - The unique identifier of the task to check for assignments.
 *
 * @returns {void}
 *
 * @example
 * // Update the checkmark status for a contact in the choosing list for the task with ID 'task123'
 * fillAssigned({ id: 1, color: '#ff0000' }, 'task123');
 */
function fillAssigned(contact, taskId) {
    let task = tasks.find(task => task.id === taskId);
    let UserId = contact['id'];
    if (task.assignedTo && task.assignedTo.includes(Number(UserId))) {
        document.getElementById(`choosingListCheckImg${contact['id']}`).classList.remove('completedFalse');
        document.getElementById(`choosingListCheckImg${contact['id']}`).classList.add('completedTrue');
    } else {
        document.getElementById(`choosingListCheckImg${contact['id']}`).classList.add('completedFalse');
        document.getElementById(`choosingListCheckImg${contact['id']}`).classList.remove('completedTrue');
    }
}


/**
 * Toggles the assignment status of a contact for a specific task.
 *
 * This function adds or removes a contact from the list of assigned contacts for a given task,
 * and updates the visual checkmark in the choosing list to reflect the current assignment status.
 *
 * @param {number} contactId - The unique identifier of the contact to be toggled.
 * @param {string} taskId - The unique identifier of the task for which the contact assignment is toggled.
 *
 * @returns {void}
 *
 * @example
 * // Toggle the assignment status of contact with ID 1 for the task with ID 'task123'
 * toggleAssigned(1, 'task123');
 */
function toggleAssigned(contactId, taskId) {
    let task = tasks.find(task => task.id === taskId);
    if (!task.assignedTo) {
        task.assignedTo = [];
    }
    let isAssigned = task.assignedTo.includes(Number(contactId));
    let checkImg = document.getElementById(`choosingListCheckImg${contactId}`);
    if (isAssigned) {
        task.assignedTo = task.assignedTo.filter(id => id !== Number(contactId));
        checkImg.classList.add('completedFalse');
        checkImg.classList.remove('completedTrue');
    } else {
        task.assignedTo.push(Number(contactId));
        checkImg.classList.add('completedTrue');
        checkImg.classList.remove('completedFalse');
    }
    renderAssignedTosEdit(taskId);
}


/**
 * Filters the contacts in the dropdown list based on the search input.
 *
 * This function updates the visibility of contact rows in the dropdown list to match the search criteria.
 * It hides or shows each contact row based on whether the contact's name includes the search string entered
 * in the dropdown search input. The search is case-insensitive.
 *
 * @returns {void}
 *
 * @example
 * // Filters the contact list based on the input value in the 'contactsDropDown' element
 * editFilterNames();
 */
function editFilterNames() {
    let search = document.getElementById('contactsDropDown').value.toLowerCase();
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i]['name'].toLowerCase().includes(search)) {
            document.getElementById(`choosingListRow${contacts[i]['id']}`).classList.remove('dnone');
        } else {
            document.getElementById(`choosingListRow${contacts[i]['id']}`).classList.add('dnone');
        }
    }
}


/**
 * Updates the task with the new details from the edit form and saves the changes.
 *
 * This function retrieves updated values for the task title, description, and due date from the form,
 * saves the task changes, and then re-renders the single task view.
 *
 * @param {Event} event - The event object associated with the form submission.
 * @param {string} taskId - The unique identifier of the task to be updated.
 *
 * @returns {Promise<void>} A promise that resolves when the task is saved and re-rendered.
 *
 * @async
 *
 * @example
 * // Handle the form submission to update and save a task with ID 'task123'
 * finishEdit(event, 'task123');
 */
async function finishEdit(event, taskId) {
    event.preventDefault();
    let task = tasks.find(task => task.id === taskId);
    task['title'] = document.getElementById('editTitle').value;
    task['description'] = document.getElementById('editDescription').value;
    task['dueDate'] = document.getElementById('editDueDate').value;
    await saveTasks();
    renderSingleTask(taskId);
}


/**
 * Renders the assigned contacts for a task in the edit view.
 *
 * This function updates the edit view by displaying the assigned contacts for the specified task.
 * It retrieves the list of assigned contacts from the task and generates the HTML to show their icons and initials.
 * The function also applies the corresponding color to each contact's icon.
 *
 * @param {string} taskId - The unique identifier of the task whose assigned contacts are to be rendered.
 *
 * @returns {void}
 *
 * @example
 * // Render assigned contacts for a task with ID 'task123' in the edit view
 * renderAssignedTosEdit('task123');
 */
function renderAssignedTosEdit(taskId) {
    let task = tasks.find(task => task.id === taskId);
    let assignedTos = task['assignedTo'];
    document.getElementById(`editAssignedTosChosenEdit`).innerHTML = ``;
    if (assignedTos) {
        for (let i = 0; i < assignedTos.length; i++) {
            let userId = assignedTos[i];
            let contact = findContactById(contacts, userId);
            document.getElementById(`editAssignedTosChosenEdit`).innerHTML += renderAssignedTosEditHTML(i);
            let color = contact['color'];
            document.getElementById(`userIconEdit${i}`).classList.add(`${color}`.replace("#", 'C'));
            document.getElementById(`userInitialsEdit${i}`).innerHTML = `${contact['initials']}`;
        }
    }
}


/**
 * Creates a new sub-task object with the given title.
 *
 * This function generates a new sub-task object with a unique ID, a completion status of `false`, and the provided content.
 * The unique ID is generated using the current timestamp.
 *
 * @param {string} title - The content or title of the sub-task.
 * 
 * @returns {Object} The newly created sub-task object with the following properties:
 * - `completet` (boolean): The completion status of the sub-task, initially set to `false`.
 * - `content` (string): The content or title of the sub-task.
 * - `id` (number): A unique identifier for the sub-task, generated using the current timestamp.
 *
 * @example
 * // Create a new sub-task with the title "Finish documentation"
 * const newSubTask = createSubTask('Finish documentation');
 */
function createSubTask(title) {
    return {
        completet: false,
        content: title,
        id: Date.now()
    };
}
function createSubTask(title) {
    return {
        completet: false,
        content: title,
        id: Date.now()
    };
}


/**
 * Adds a new sub-task to the specified task and updates the UI.
 *
 * This function retrieves the task with the given `taskId`, creates a new sub-task using the content from the input field,
 * and appends it to the task's list of sub-tasks. It also clears the input field, saves the updated tasks, and re-renders
 * the sub-tasks in the UI.
 *
 * @param {number|string} taskId - The unique identifier of the task to which the sub-task will be added.
 * 
 * @returns {void}
 *
 * @throws {Error} Throws an error if the task with the specified `taskId` is not found.
 *
 * @example
 * // Add a sub-task to the task with ID 123
 * addSubTask(123);
 */
function addSubTask(taskId) {
    let task = tasks.find(task => task.id === taskId);
    let subTaskTitle = document.getElementById('editSubTasks').value;
    if (!task.subTasks) task.subTasks = [];
    task.subTasks.push(createSubTask(subTaskTitle));
    document.getElementById('editSubTasks').value = '';
    saveTasks(); // Assuming saveTasks() updates the tasks storage
    renderSubtasksEdit(taskId);
}


/**
 * Renders the list of sub-tasks for editing within a specified task.
 *
 * This function retrieves the task with the given `taskId`, and if the task has sub-tasks, it generates HTML for each
 * sub-task and updates the UI to display these sub-tasks. The HTML for the sub-tasks is generated using the
 * `renderSubtasksEditHTML` function.
 *
 * @param {number|string} taskId - The unique identifier of the task whose sub-tasks are to be rendered.
 * 
 * @returns {void}
 *
 * @throws {Error} Throws an error if the task with the specified `taskId` is not found.
 *
 * @example
 * // Render sub-tasks for the task with ID 123
 * renderSubtasksEdit(123);
 */
function renderSubtasksEdit(taskId) {
    let task = tasks.find(task => task.id === taskId);
    document.getElementById('editSubtasksList').innerHTML = ``;
    if (task['subTasks']) {
        for (let i = 0; i < task['subTasks'].length; i++) {
            let singleSubtask = task['subTasks'][i];
            document.getElementById('editSubtasksList').innerHTML += renderSubtasksEditHTML(task, singleSubtask);
        }
    }
}


/**
 * Deletes a sub-task from a specified task and updates the UI.
 *
 * This function locates the task with the given `taskId` and removes the sub-task with the specified `subTaskId`
 * from the task's list of sub-tasks. If the task or sub-task is not found, it logs an appropriate message to the console.
 * After deletion, it updates the display of sub-tasks using `renderSubtasksEdit`.
 *
 * @param {number|string} taskId - The unique identifier of the task from which the sub-task should be removed.
 * @param {number|string} subTaskId - The unique identifier of the sub-task to be deleted.
 * 
 * @returns {void}
 *
 * @example
 * // Delete the sub-task with ID 456 from the task with ID 123
 * deleteEditSubTask(123, 456);
 */
function deleteEditSubTask(taskId, subTaskId) {
    let task = tasks.find(task => task.id === taskId);
    if (task) {
        let subTaskIndex = task.subTasks.findIndex(subTask => subTask.id === subTaskId);
        if (subTaskIndex !== -1) {
            task.subTasks.splice(subTaskIndex, 1);
        } else {
            console.log(`Subtask with id ${subTaskId} not found.`);
        }
    } else {
        console.log(`Task with id ${taskId} not found.`);
    };
    renderSubtasksEdit(taskId);
}
