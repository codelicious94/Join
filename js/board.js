let filteredTasks = [];
let InProgress = [];
let currentDragElement = [];
let chosenPriority;


/**
 * Initializes the application by performing a series of asynchronous and synchronous operations.
 * 
 * The function performs the following steps in order:
 * 1. Includes HTML content (using `includeHTML`).
 * 2. Loads tasks from a data source (using `loadTasks`).
 * 3. Loads contacts from a data source (using `loadContacts`).
 * 4. Checks the user session or status (using `checkUser`).
 * 5. Fills user initials based on the user data (using `fillUserInitials`).
 * 6. Renders the tasks board (using `renderTasksBoard`).
 * 
 * This function ensures that all necessary components and data are prepared before the application
 * becomes fully interactive and functional.
 * 
 * @async
 * @function
 * @returns {Promise<void>} A promise that resolves when all asynchronous operations are complete.
 */
async function init() {
    await includeHTML();
    await loadTasks();
    await loadContacts();
    checkUser();
    fillUserInitials();
    renderTasksBoard();
}


/**
 * Navigates the user to the "Add Task" page.
 * 
 * This function updates the current URL to redirect the browser to the `/html/add_task.html` page,
 * where users can add a new task.
 * 
 * @function
 * @returns {void}
 */
function addTask() {
    window.location.href = '/html/add_task.html';
}


/**
 * Changes the color of a task element based on its category.
 *
 * This function modifies the class of an HTML element to apply a specific color
 * depending on the task's category. It assumes that the task element's ID is in the
 * format of "{category}{taskId}", where {category} is the category of the task and
 * {taskId} is the unique identifier for the task.
 *
 * @param {string} taskId - The unique identifier for the task. This is used to construct
 *   the ID of the HTML element that represents the task.
 * @param {string} category - The category of the task. Valid values are:
 *   - "User Story": Applies the 'userStoryColor' class.
 *   - "Technical Tasks": Applies the 'technicalTaskColor' class.
 * @throws {Error} Throws an error if the category is not recognized.
 */
function changeCategoryColor(taskId, category) {
    let color = '';
    if (category === "User Story") {
        color = 'userStoryColor'
    } else if (category === 'Technical Tasks') {
        color = 'technicalTaskColor';
    }
    document.getElementById(`category${taskId}`).classList.add(`${color}`);
}

/**
 * Updates the progress information of a task based on its subtasks.
 *
 * This function updates the progress container of a task by showing or hiding it,
 * and updating the progress counter and progress bar according to the completion
 * status of its subtasks.
 *
 * @param {string} taskId - The unique identifier for the task. This is used to construct
 *   the IDs of the HTML elements that represent the progress container, progress counter,
 *   progress max, and progress bar.
 * @param {Array<{ completet: boolean }>|undefined} [subTasks] - An optional array of subtask objects.
 *   Each subtask object should have a `completet` property indicating whether the subtask is completed (`true`) or not (`false`).
 *   If `subTasks` is `undefined`, the progress container will be hidden.
 *
 * @example
 * // Show the progress container and update progress for a task with ID 'task1'
 * changeProgressInfos('task1', [
 *   { completet: true },
 *   { completet: false },
 *   { completet: true }
 * ]);
 *
 * @example
 * // Hide the progress container for a task with ID 'task2' when no subtasks are provided
 * changeProgressInfos('task2');
 */
function changeProgressInfos(taskId, subTasks) {
    if (subTasks == undefined) {
        document.getElementById(`progressContainer${taskId}`).classList.add('dnone')
    } else {
        let length = subTasks.length;
        document.getElementById(`progressMax${taskId}`).innerHTML = `${length}`;
        let completedCount = subTasks.filter(subTask => subTask.completet).length;
        document.getElementById(`progressCounter${taskId}`).innerHTML = `${completedCount}`;
        let width = Math.round((completedCount / length) * 100);
        document.getElementById(`progress${taskId}`).style.width = `${width}%`;
    }
}


/**
 * Updates the priority image for a specific task.
 *
 * This function adds a CSS class to an HTML element representing the priority of a task.
 * The CSS class is based on the provided priority string, which determines the visual
 * representation of the task's priority.
 *
 * @param {string} taskId - The unique identifier for the task. This is used to construct
 *   the ID of the HTML element representing the task's priority.
 * @param {string} priorityString - A string representing the priority level. This string
 *   is used to create the CSS class name to be added to the priority element.
 *   For example, if `priorityString` is 'High', the class `classHigh` will be added.
 *
 * @example
 * // Set the priority image to 'High' for a task with ID 'task1'
 * changePriorityImg('task1', 'High');
 *
 * @example
 * // Set the priority image to 'Low' for a task with ID 'task2'
 * changePriorityImg('task2', 'Low');
 */
function changePriorityImg(taskId, priorityString) {
    document.getElementById(`priority${taskId}`).classList.add(`class${priorityString}`);
}


/**
 * Finds a contact by its unique identifier.
 *
 * This function searches through an array of contact objects and returns the contact object
 * that matches the specified ID. If no matching contact is found, it returns `undefined`.
 *
 * @param {Array<Object>} contacts - An array of contact objects. Each contact object should
 *   have an `id` property representing the unique identifier of the contact.
 * @param {string} id - The unique identifier of the contact to find. This ID is compared
 *   against the `id` properties of the contact objects in the `contacts` array.
 * @returns {Object|undefined} The contact object with the matching ID, or `undefined` if
 *   no contact with the specified ID is found.
 *
 * @example
 * const contacts = [
 *   { id: '1', name: 'Alice' },
 *   { id: '2', name: 'Bob' },
 *   { id: '3', name: 'Charlie' }
 * ];
 * 
 * // Find contact with ID '2'
 * const contact = findContactById(contacts, '2');
 * console.log(contact); // { id: '2', name: 'Bob' }
 *
 * // Attempt to find a contact with an ID that does not exist
 * const missingContact = findContactById(contacts, '999');
 * console.log(missingContact); // undefined
 */
function findContactById(contacts, id) {
    return contacts.find(contact => contact.id === id);
}


/**
 * Handles the start of a drag operation for a task.
 *
 * This function initiates the drag action by updating the visual representation of the task
 * being dragged, clearing any empty task containers, and rendering a new empty task
 * container based on the current task's status.
 *
 * @param {string} id - The unique identifier of the task being dragged. This ID is used to
 *   update the visual state of the task and to determine its status for rendering an empty
 *   task container.
 *
 * @example
 * // Start dragging the task with ID 'task1'
 * draggingStart('task1');
 */
function draggingStart(id) {
    clearNoTaskContainers();
    currentDragElement = id;
    document.getElementById(`${id}`).classList.add('rotate-5deg');
    let taskStatus = tasks.find(task => task.id === id)?.status;
    renderEmptyTask(taskStatus);
}


/**
 * Handles the end of a drag operation for a task.
 *
 * This function finalizes the drag action by resetting the visual state of the task
 * and then re-rendering the task board to reflect any changes that might have occurred
 * during the drag operation.
 *
 * @param {string} id - The unique identifier of the task being dragged. This ID is used to
 *   reset the visual state of the task (by removing the 'rotate-5deg' class) and to
 *   update the task board.
 *
 * @example
 * // End dragging the task with ID 'task1'
 * draggingEnd('task1');
 */
function draggingEnd(id) {
    document.getElementById(`${id}`).classList.remove('rotate-5deg');
    renderTasksBoard();
}


/**
 * Hides all HTML elements with the class 'noTaskContainer'.
 *
 * This function selects all `div` elements with the class `noTaskContainer` and
 * adds the `dnone` class to each of them. This effectively hides these elements
 * from view.
 *
 * @example
 * // Hide all elements with the class 'noTaskContainer'
 * clearNoTaskContainers();
 */
function clearNoTaskContainers() {
    // Alle div-Elemente mit der Klasse noTaskContainer auswählen
    var elements = document.querySelectorAll('div.noTaskContainer');

    // Über alle ausgewählten Elemente iterieren
    elements.forEach(function (element) {
        // Die Klasse dnone zu jedem Element hinzufügen
        element.classList.add('dnone');
    });
}


/**
 * Prevents the default behavior of the drag-and-drop operation.
 *
 * This function is intended to be used as an event handler for the `dragover` event.
 * It prevents the browser's default handling of the event, which is necessary to allow
 * the drop operation to occur.
 *
 * @param {DragEvent} ev - The drag event object. This object represents the event
 *   that is fired when an element is being dragged over a valid drop target.
 *
 * @example
 * // Attach the allowDrop function to the dragover event of an element with ID 'dropZone'
 * document.getElementById('dropZone').addEventListener('dragover', allowDrop);
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Moves the currently dragged task to a new category.
 *
 * This function updates the status of the currently dragged task to the specified
 * category. After updating the task's status, it saves the updated task list and
 * re-renders the task board to reflect the changes.
 *
 * @param {string} category - The new category to which the task should be moved. 
 *   This represents the new status or category of the task, which will be assigned
 *   to the `status` property of the task.
 *
 * @example
 * // Move the currently dragged task to the 'Completed' category
 * moveTo('Completed');
 */
function moveTo(category) {
    let task = tasks.find(task => task.id === currentDragElement);
    task['status'] = category;
    saveTasks();
    renderTasksBoard();
}


/**
 * Renders empty task placeholders in the task containers based on the provided status.
 *
 * This function adds empty task placeholders to all task containers except the one
 * that matches the provided status. This creates a visual cue indicating that tasks
 * can be added to these containers.
 *
 * @param {string} taskStatus - The status of the task. Determines which task containers
 *   will receive the empty task placeholders. Possible values are 'toDo', 'inProgress',
 *   'awaitingFeedback', and 'done'.
 */
function renderEmptyTask(taskStatus) {
    const containers = {
        toDo: 'taskContainerContentToDo',
        inProgress: 'taskContainerContentInProgress',
        awaitingFeedback: 'taskContainerContentAwaitFeedback',
        done: 'taskContainerContentDone'
    };
    Object.entries(containers).forEach(([status, containerId]) => {
        if (status !== taskStatus) {
            document.getElementById(containerId).innerHTML += /*html*/`
              <div class="emptyTask"></div>  
            `;
        }
    });
}


/**
 * Filters tasks based on the search input and toggles their visibility.
 *
 * This function retrieves the search query from an input field, converts it to lowercase,
 * and then iterates through the list of tasks. It shows or hides tasks based on whether
 * their title or description includes the search query. Tasks that match the search query
 * are displayed, while those that do not are hidden.
 *
 * @example
 * // Filter tasks based on the input in the 'searchMobileInput' field
 * filterTasks();
 */
function filterTasks() {
    let search = document.getElementById('searchMobileInput').value.toLowerCase();
    for (let i = 0; i < tasks.length; i++) {
        let title = tasks[i]['title'].toLowerCase();
        let description = tasks[i]['description'].toLowerCase();
        if (title.includes(search) || description.includes(search)) {
            document.getElementById(`${tasks[i]['id']}`).classList.remove('dnone');
        } else {
            document.getElementById(`${tasks[i]['id']}`).classList.add('dnone');
        }
    }
}


/**
 * Closes the single task view and resets the page state.
 *
 * This function handles the closing of a single task view dialog. It removes the `overflowHidden`
 * class from the body, hides the dialog background, and adjusts the visibility of the single task
 * view. It then reloads the tasks and re-renders the task board to reflect any updates.
 *
 * @param {MouseEvent} event - The event object associated with the closing action. Used to
 *   determine if the click event occurred on the dialog background (to close the view) or elsewhere.
 *
 * @returns {Promise<void>} A promise that resolves when the tasks have been reloaded and the task board
 *   has been re-rendered. This is because the function uses `await` to handle asynchronous operations.
 *
 * @example
 * // Close the single task view when the background is clicked
 * document.getElementById('dialogBackground').addEventListener('click', closeSingleView);
 */
async function closeSingleView(event) {
    document.getElementById('body').classList.remove('overflowHidden');
    if (event.target === event.currentTarget) {
        document.getElementById('dialogBackground').classList.add('dnone');
        document.getElementById('singleTask').classList.remove('singleTaskEndposition');
        document.getElementById('body').classList.add('overFlowAuto');
    }
    await loadTasks()
    renderTasksBoard();
}
