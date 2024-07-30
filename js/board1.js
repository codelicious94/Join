/**
 * Stops the propagation of the event to parent elements.
 *
 * This function prevents the event from bubbling up to parent elements in the DOM.
 * It is commonly used to stop event handlers on parent elements from being triggered
 * by events on child elements.
 *
 * @param {Event} event - The event object whose propagation should be stopped.
 *   This object represents the event that is being handled.
 *
 * @example
 * // Attach stopPropagation to a click event on an element with ID 'button'
 * document.getElementById('button').addEventListener('click', stopPropagation);
 */
function stopPropagation(event) {
    event.stopPropagation;
}


/**
 * Displays a single task view in a modal dialog.
 *
 * This function shows a detailed view of a single task by updating the page's state to
 * include a modal dialog. It adds the `overflowHidden` class to the body to prevent
 * scrolling, renders the single task's details, and displays the dialog background.
 * It then adds a class to animate the appearance of the single task view and removes
 * the `overFlowAuto` class from the body to ensure it does not scroll.
 *
 * @param {string} taskId - The unique identifier of the task to be displayed. This ID is
 *   used to fetch and render the specific task's details in the modal dialog.
 *
 * @example
 * // Show the task with ID 'task123' in the modal dialog
 * showTask('task123');
 */
function showTask(taskId) {
    document.getElementById('body').classList.add('overflowHidden');
    renderSingleTask(taskId);
    document.getElementById('dialogBackground').classList.remove('dnone');
    setTimeout(() => { document.getElementById('singleTask').classList.add('singleTaskEndposition') }, 0);
    document.getElementById('body').classList.remove('overFlowAuto');
}


/**
 * Renders the details of a single task in the task view.
 *
 * This function finds a task by its unique identifier, formats its priority, and updates
 * the HTML content of the single task view. It also applies the task's category color, and
 * renders the task's assigned users and subtasks.
 *
 * @param {string} taskId - The unique identifier of the task to be rendered. This ID is
 *   used to locate the task within the tasks array and display its details.
 *
 * @returns {void}
 *
 * @example
 * // Render the task with ID 'task123' in the single task view
 * renderSingleTask('task123');
 */
function renderSingleTask(taskId) {
    let task = tasks.find(task => task.id === taskId);
    let taskpriority = task['priority'].charAt(0).toUpperCase() + task['priority'].slice(1);;
    document.getElementById('singleTask').innerHTML = renderSingleTaskHTML(task, taskId, taskpriority);
    changeSingleTaskCategoryColor(task);
    renderSingleTaskAssignedTo(task);
    renderSingleTaskSubtasks(task);
}


/**
 * Changes the background color of the single task category based on the task's category.
 *
 * This function updates the visual style of the single task view by applying a CSS class
 * corresponding to the task's category. It sets the background color of the task category
 * element based on whether the category is "User Story" or "Technical Tasks".
 *
 * @param {Object} task - The task object containing details of the task. This object should
 *   include a `category` property which determines the color class to be applied.
 * @param {string} task.category - The category of the task, which determines the color to apply.
 *   Possible values are "User Story" and "Technical Tasks".
 *
 * @returns {void}
 *
 * @example
 * // Change the category color for a task with a given category
 * changeSingleTaskCategoryColor({ category: 'User Story' });
 */
function changeSingleTaskCategoryColor(task) {
    category = task['category'];
    let color = '';
    if (category === "User Story") {
        color = 'userStoryColor'
    } else if (category === 'Technical Tasks') {
        color = 'technicalTaskColor';
    }
    document.getElementById(`singleTaskCategory`).classList.add(`${color}`);
}


/**
 * Renders the list of users assigned to a single task in the task view.
 *
 * This function updates the assigned users section of the single task view by clearing
 * any existing content and then adding elements for each user assigned to the task. It
 * retrieves user details based on their IDs, creates HTML elements for displaying user
 * information (such as initials and name), and applies appropriate styling.
 *
 * @param {Object} task - The task object containing details of the task.
 * @param {Array<string>} task.assignedTo - An array of user IDs representing the users assigned
 *   to the task. Each ID is used to find the corresponding contact details.
 *
 * @returns {void}
 *
 * @example
 * // Render the assigned users for a task with a specific assignedTo list
 * renderSingleTaskAssignedTo({
 *     assignedTo: ['user1', 'user2']
 * });
 */
function renderSingleTaskAssignedTo(task) {
    let assignedTos = task['assignedTo'];
    document.getElementById(`singleTaskAssignedTo`).innerHTML = `<div>Assigned to:</div>`;
    if (assignedTos) {
        for (let i = 0; i < assignedTos.length; i++) {
            let assignedToIndex = assignedTos[i];
            let contact = findContactById(contacts, assignedToIndex);
            document.getElementById(`singleTaskAssignedTo`).innerHTML += renderSingleTaskAssignedToHTML(i);
            document.getElementById(`userInitialsSingleTask${i}`).innerHTML = `${contact['initials']}`;
            document.getElementById(`userNameSingleTask${i}`).innerHTML = `${contact['name']}`;
            let color = contact['color'];
            document.getElementById(`userIconSingleTask${i}`).classList.add(`${color}`.replace("#", 'C'));
        }
    }
}


/**
 * Renders the subtasks of a single task in the task view.
 *
 * This function updates the subtasks section of the single task view. It starts by displaying
 * a header indicating the presence of subtasks. If the task has subtasks, it iterates through
 * them, rendering each subtask's details. If there are no subtasks, the section is cleared.
 *
 * @param {Object} task - The task object containing details of the task.
 * @param {Array<Object>} task.subTasks - An array of objects representing the subtasks of the task.
 *   Each subtask object contains specific details about the subtask.
 *
 * @returns {void}
 *
 * @example
 * // Render the subtasks for a task with a specific subTasks list
 * renderSingleTaskSubtasks({
 *     subTasks: [
 *         { id: 'subtask1', title: 'Subtask 1', completed: false },
 *         { id: 'subtask2', title: 'Subtask 2', completed: true }
 *     ]
 * });
 */
function renderSingleTaskSubtasks(task) {
    document.getElementById('singleTaskSubTasks').innerHTML = `<div>Subtasks:</div>`
    let subTasks = task['subTasks'];
    if (!subTasks) {
        document.getElementById('singleTaskSubTasks').innerHTML = ``;
    } else if (subTasks.length > 0) {
        for (let i = 0; i < subTasks.length; i++) {
            let subTask = subTasks[i];
            document.getElementById('singleTaskSubTasks').innerHTML += renderSingleTaskSubtasksHTML(subTask, task);
        }
    }
}


/**
 * Toggles the completion status of a subtask and updates the UI.
 *
 * This function finds the specified subtask by its ID within a task and toggles its
 * `completet` status. It then updates the UI to reflect the new status by changing
 * the corresponding CSS classes.
 *
 * @param {string} taskId - The ID of the task containing the subtask.
 * @param {string} subTaskId - The ID of the subtask to be toggled.
 *
 * @returns {void}
 */
function changeSubTaskCompletet(taskId, subTaskId) {
    let task = tasks.find(task => task.id === taskId);
    if (task) {
        let subTask = task.subTasks.find(subTask => subTask.id === subTaskId);
        if (subTask) {
            subTask.completet = !subTask.completet;
            let imgElement = document.getElementById(`checkImg${subTaskId}`);
            imgElement.classList.toggle('subTaskCompletedtrue', subTask.completet);
            imgElement.classList.toggle('subTaskCompletedfalse', !subTask.completet);
        }
        saveTasks();
    }
}


/**
 * Deletes a task by its unique identifier.
 *
 * This function removes a task from the global `tasks` array using its unique `taskId`,
 * then saves the updated task list and reloads the page to reflect the changes.
 *
 * @param {string} taskId - The unique identifier of the task to be deleted.
 *
 * @returns {void}
 *
 * @example
 * // Delete the task with ID 'task123'
 * deleteTask('task123');
 */
async function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    await saveTasks();
    location.reload();
}


/**
 * Initiates the editing mode for a specified task.
 *
 * This function sets up the UI for editing a task by rendering the HTML elements needed
 * for task editing. It preloads existing task values such as input fields, priority, 
 * assigned users, and subtasks into the respective input elements for editing.
 *
 * @param {string} taskId - The unique identifier of the task to be edited.
 *
 * @returns {void}
 *
 * @example
 * // Enter edit mode for the task with ID 'task123'
 * editTask('task123');
 */
function editTask(taskId) {
    document.getElementById('singleTask').innerHTML = editTaskHTML(taskId);
    getPreloadedInputValues(taskId);
    getPreloadedPriority(taskId);
    renderChoosingList(taskId);
    renderAssignedTosEdit(taskId);
    renderSubtasksEdit(taskId);
}


/**
 * Preloads the existing task values into the edit form inputs.
 *
 * This function retrieves the current values of a task, such as the title, description,
 * and due date, and populates the corresponding input fields in the edit form. Additionally,
 * it sets the minimum date for the due date input to the current date to prevent past date entries.
 *
 * @param {string} taskId - The unique identifier of the task whose values are to be preloaded.
 *
 * @returns {void}
 *
 * @example
 * // Preload values for the task with ID 'task123' into the edit form
 * getPreloadedInputValues('task123');
 */
function getPreloadedInputValues(taskId) {
    let task = tasks.find(task => task.id === taskId);
    let preloadedTitle = task['title'];
    document.getElementById('editTitle').value = preloadedTitle;
    let preloadedDescription = task['description'];
    document.getElementById('editDescription').value = preloadedDescription;
    let preloadedDueDate = task['dueDate'];
    document.getElementById('editDueDate').value = preloadedDueDate;
    setEditDueDateMinDate();
}


/**
 * Sets the minimum allowable date for the due date input field in the edit form.
 *
 * This function calculates the current date and formats it in the 'YYYY-MM-DD' format,
 * which is compatible with HTML5 date input fields. It then sets this date as the minimum
 * selectable date in the 'editDueDate' input field, preventing the selection of past dates.
 *
 * @returns {void}
 *
 * @example
 * // Set the minimum date for the due date input to today's date
 * setEditDueDateMinDate();
 */
function setEditDueDateMinDate() {
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    let dd = String(today.getDate()).padStart(2, '0');
    let formattedDate = yyyy + '-' + mm + '-' + dd;
    document.getElementById('editDueDate').setAttribute('min', formattedDate);
}


/**
 * Preloads the priority level of a task into the edit form.
 *
 * This function retrieves the priority level of the specified task and calls the appropriate
 * function to set the priority in the edit form. It distinguishes between 'urgent', 'medium',
 * and 'low' priority levels, setting the corresponding UI elements accordingly.
 *
 * @param {string} taskId - The unique identifier of the task whose priority is to be preloaded.
 *
 * @returns {void}
 *
 * @example
 * // Preload the priority for the task with ID 'task123' into the edit form
 * getPreloadedPriority('task123');
 */
function getPreloadedPriority(taskId) {
    let task = tasks.find(task => task.id === taskId);
    let preloadedPriority = task['priority'];
    if (preloadedPriority == 'urgent') {
        changeChosenPriorityToUrgent(taskId);
    } else if (preloadedPriority == 'medium') {
        changeChosenPriorityToMedium(taskId);
    } else {
        changeChosenPriorityToLow(taskId);
    }
}


/**
 * Sets the priority of a task to 'urgent' and updates the UI accordingly.
 *
 * This function changes the priority of the specified task to 'urgent' and visually updates
 * the edit form to reflect this priority selection. It highlights the 'urgent' priority choice,
 * while removing any highlight from other priority options ('medium' and 'low').
 *
 * @param {string} taskId - The unique identifier of the task whose priority is to be set to 'urgent'.
 *
 * @returns {void}
 *
 * @example
 * // Set the priority of the task with ID 'task123' to 'urgent'
 * changeChosenPriorityToUrgent('task123');
 */
function changeChosenPriorityToUrgent(taskId) {
    chosenPriority = 'urgent';
    let task = tasks.find(task => task.id === taskId);
    task['priority'] = 'urgent';
    document.getElementById('prioritySubUrgent').classList.add('backgroundColorUrgent');
    document.getElementById('editPriorityUrgentImg').classList.add('whiteningFilter');
    document.getElementById('prioritySubMedium').classList.remove('backgroundColorMedium');
    document.getElementById('editPriorityMediumImg').classList.remove('whiteningFilter');
    document.getElementById('prioritySubLow').classList.remove('backgroundColorLow');
    document.getElementById('editPriorityLowImg').classList.remove('whiteningFilter');
}


/**
 * Sets the priority of a task to 'medium' and updates the UI accordingly.
 *
 * This function changes the priority of the specified task to 'medium' and visually updates
 * the edit form to reflect this priority selection. It highlights the 'medium' priority choice,
 * while removing any highlight from other priority options ('urgent' and 'low').
 *
 * @param {string} taskId - The unique identifier of the task whose priority is to be set to 'medium'.
 *
 * @returns {void}
 *
 * @example
 * // Set the priority of the task with ID 'task123' to 'medium'
 * changeChosenPriorityToMedium('task123');
 */
function changeChosenPriorityToMedium(taskId) {
    chosenPriority = 'medium';
    let task = tasks.find(task => task.id === taskId);
    task['priority'] = 'medium';
    document.getElementById('prioritySubMedium').classList.add('backgroundColorMedium');
    document.getElementById('editPriorityMediumImg').classList.add('whiteningFilter');
    document.getElementById('prioritySubUrgent').classList.remove('backgroundColorUrgent');
    document.getElementById('editPriorityUrgentImg').classList.remove('whiteningFilter');
    document.getElementById('prioritySubLow').classList.remove('backgroundColorLow');
    document.getElementById('editPriorityLowImg').classList.remove('whiteningFilter');
}