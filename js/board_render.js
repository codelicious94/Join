/**
 * Renders the entire tasks board by updating the display of tasks across different status categories.
 *
 * This function calls individual rendering functions for different sections of the tasks board:
 * - To-Do
 * - In Progress
 * - Awaiting Feedback
 * - Done
 * 
 * Each section will be populated with the appropriate tasks according to their status.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * // Calls this function to refresh the entire tasks board.
 * renderTasksBoard();
 */
function renderTasksBoard() {
    renderTodosBoard();
    renderInProgressBoard();
    renderAwaitFeedbackBoard();
    renderDoneBoard();
}


/**
 * Renders the "To-Do" tasks section of the tasks board.
 *
 * This function updates the HTML content of the "To-Do" task container. It first clears any existing content and then populates it with tasks that have a status of "toDo". If there are no tasks, a message is displayed indicating that no tasks are in progress. For each task, the function creates HTML elements and sets up event handlers for interactions such as showing details, dragging, and dropping.
 *
 * - Updates the inner HTML of the container with the ID `taskContainerContentToDo`.
 * - Displays a message if no tasks are available.
 * - Renders each task with its details, including category, title, description, progress, assigned users, and priority.
 * - Applies additional visual changes and functionalities such as category color, progress info, assigned users, and priority images.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * // Calls this function to render the "To-Do" tasks section on the board.
 * renderTodosBoard();
 */
function renderTodosBoard() {
    document.getElementById('taskContainerContentToDo').innerHTML = ``;
    filteredTasks = tasks.filter(task => task.status === "toDo");
    if (filteredTasks.length < 1) {
        document.getElementById('taskContainerContentToDo').innerHTML =/*html*/ `
        <div class="noTaskContainer">
            <span class="noTaskText">No tasks to do</span>
        </div>
        `
    } else {
        for (let i = 0; i < filteredTasks.length; i++) {
            let taskId = filteredTasks[i]['id'];
            document.getElementById('taskContainerContentToDo').innerHTML += /*html*/ `
                <div class="task" id="${taskId}" onclick="showTask(${taskId})" draggable="true" ondragstart="draggingStart(${taskId})" ondragend="draggingEnd(${taskId})">
                    <div class="taskHeadlineBoard">
                        <div class="taskCategory" id="category${taskId}">${filteredTasks[i]['category']}</div>
                        <div class="taskHeadlineBoardArrows">
                        <img class="boardArrow down" src="../assets/img/boardArrow.svg" id="arrowDown${taskId}" alt="" onclick="event.stopPropagation(), statusOneUp(${taskId})">
                        <img class="boardArrow up"src="../assets/img/boardArrow.svg" id="arrowUp${taskId}" alt="" onclick="event.stopPropagation(), statusOneDown(${taskId})">
                        </div>
                    </div>
                    <span class="taskTitle">${filteredTasks[i]['title']}</span>
                    <span class="taskDescription">${filteredTasks[i]['description']}</span>
                            <div class="progressContainer" id="progressContainer${taskId}">
                                <div class="progressBar">
                                    <div class="progress" id="progress${taskId}"></div>
                                </div>
                                <div class="progressText"><span id="progressCounter${taskId}"></span>/<span id="progressMax${taskId}">5</span> Subtasks</div>
                            </div>
                            <div class="taskBottom">
                                <div class="assignedTo" id="assignedTo${taskId}">
                                    <div class="userIcon">
                                        <div class="userInitials">NS</div>
                                    </div>
                                </div>
                                <div id="priority${taskId}" class="taskPriority"></div>
                            </div>
                        </div>
                `;
            changeCategoryColor(taskId, filteredTasks[i]['category']);
            changeProgressInfos(taskId, filteredTasks[i]['subTasks']);
            changeAssignedTos(taskId, filteredTasks[i]['assignedTo']);
            changePriorityImg(taskId, filteredTasks[i]['priority']);
            changeArrows(taskId);
        }
    }
}


/**
 * Renders the "In Progress" tasks section of the tasks board.
 *
 * This function updates the HTML content of the "In Progress" task container. It first clears any existing content and then populates it with tasks that have a status of "inProgress". If there are no tasks, a message is displayed indicating that no tasks are in progress. For each task, the function creates HTML elements and sets up event handlers for interactions such as showing details, dragging, and dropping.
 *
 * - Updates the inner HTML of the container with the ID `taskContainerContentInProgress`.
 * - Displays a message if no tasks are available.
 * - Renders each task with its details, including category, title, description, progress, assigned users, and priority.
 * - Applies additional visual changes and functionalities such as category color, progress info, assigned users, and priority images.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * // Calls this function to render the "In Progress" tasks section on the board.
 * renderInProgressBoard();
 */
function renderInProgressBoard() {
    document.getElementById('taskContainerContentInProgress').innerHTML = ``;
    filteredTasks = tasks.filter(task => task.status === "inProgress");
    if (filteredTasks.length < 1) {
        document.getElementById('taskContainerContentInProgress').innerHTML =/*html*/ `
        <div class="noTaskContainer">
            <span class="noTaskText">No tasks in progress</span>
        </div>
        `
    } else {
        for (let i = 0; i < filteredTasks.length; i++) {
            let taskId = filteredTasks[i]['id'];
            document.getElementById('taskContainerContentInProgress').innerHTML += /*html*/ `
                <div class="task" id="${taskId}" onclick="showTask(${taskId})" draggable="true" ondragstart="draggingStart(${taskId})" ondragend="draggingEnd(${taskId})">
                    <div class="taskHeadlineBoard">
                        <div class="taskCategory" id="category${taskId}">${filteredTasks[i]['category']}</div>
                        <div class="taskHeadlineBoardArrows">
                        <img class="boardArrow down" src="../assets/img/boardArrow.svg" id="arrowDown${taskId}" alt="" onclick="event.stopPropagation(), statusOneUp(${taskId})">
                        <img class="boardArrow up"src="../assets/img/boardArrow.svg" id="arrowUp${taskId}" alt="" onclick="event.stopPropagation(), statusOneDown(${taskId})">
                        </div>
                    </div>
                    <span class="taskTitle">${filteredTasks[i]['title']}</span>
                    <span class="taskDescription">${filteredTasks[i]['description']}</span>
                            <div class="progressContainer" id="progressContainer${taskId}">
                                <div class="progressBar">
                                    <div class="progress" id="progress${taskId}"></div>
                                </div>
                                <div class="progressText"><span id="progressCounter${taskId}"></span>/<span id="progressMax${taskId}">5</span> Subtasks</div>
                            </div>
                            <div class="taskBottom">
                                <div class="assignedTo" id="assignedTo${taskId}">
                                    <div class="userIcon">
                                        <div class="userInitials">NS</div>
                                    </div>
                                </div>
                                <div id="priority${taskId}" class="taskPriority"></div>
                            </div>
                        </div>
                `;
            changeCategoryColor(taskId, filteredTasks[i]['category']);
            changeProgressInfos(taskId, filteredTasks[i]['subTasks']);
            changeAssignedTos(taskId, filteredTasks[i]['assignedTo']);
            changePriorityImg(taskId, filteredTasks[i]['priority']);
            changeArrows(taskId);
        }
    }
}


/**
 * Renders the "Awaiting Feedback" tasks section of the tasks board.
 *
 * This function updates the HTML content of the "Awaiting Feedback" task container. It first clears any existing content and then populates it with tasks that have a status of "awaitingFeedback". If there are no tasks, a message is displayed indicating that no tasks are awaiting feedback. For each task, the function creates HTML elements and sets up event handlers for interactions such as showing details, dragging, and dropping.
 *
 * - Updates the inner HTML of the container with the ID `taskContainerContentAwaitFeedback`.
 * - Displays a message if no tasks are available.
 * - Renders each task with its details, including category, title, description, progress, assigned users, and priority.
 * - Applies additional visual changes and functionalities such as category color, progress info, assigned users, and priority images.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * // Calls this function to render the "Awaiting Feedback" tasks section on the board.
 * renderAwaitFeedbackBoard();
 */
function renderAwaitFeedbackBoard() {
    document.getElementById('taskContainerContentAwaitFeedback').innerHTML = ``;
    filteredTasks = tasks.filter(task => task.status === "awaitingFeedback");
    if (filteredTasks.length < 1) {
        document.getElementById('taskContainerContentAwaitFeedback').innerHTML =/*html*/ `
        <div class="noTaskContainer">
            <span class="noTaskText">No tasks awaiting Feedback</span>
        </div>
        `
    } else {
        for (let i = 0; i < filteredTasks.length; i++) {
            let taskId = filteredTasks[i]['id'];
            document.getElementById('taskContainerContentAwaitFeedback').innerHTML += /*html*/ `
                <div class="task" id="${taskId}" onclick="showTask(${taskId})" draggable="true" ondragstart="draggingStart(${taskId})" ondragend="draggingEnd(${taskId})">
                    <div class="taskHeadlineBoard">
                        <div class="taskCategory" id="category${taskId}">${filteredTasks[i]['category']}</div>
                        <div class="taskHeadlineBoardArrows">
                            <img class="boardArrow down" src="../assets/img/boardArrow.svg" id="arrowDown${taskId}" alt="" onclick="event.stopPropagation(), statusOneUp(${taskId})">
                            <img class="boardArrow up"src="../assets/img/boardArrow.svg" id="arrowUp${taskId}" alt="" onclick="event.stopPropagation(), statusOneDown(${taskId})">
                        </div>
                    </div>
                    <span class="taskTitle">${filteredTasks[i]['title']}</span>
                    <span class="taskDescription">${filteredTasks[i]['description']}</span>
                            <div class="progressContainer" id="progressContainer${taskId}">
                                <div class="progressBar">
                                    <div class="progress" id="progress${taskId}"></div>
                                </div>
                                <div class="progressText"><span id="progressCounter${taskId}"></span>/<span id="progressMax${taskId}">5</span> Subtasks</div>
                            </div>
                            <div class="taskBottom">
                                <div class="assignedTo" id="assignedTo${taskId}">
                                    <div class="userIcon">
                                        <div class="userInitials">NS</div>
                                    </div>
                                </div>
                                <div id="priority${taskId}" class="taskPriority"></div>
                            </div>
                        </div>
                `;
            changeCategoryColor(taskId, filteredTasks[i]['category']);
            changeProgressInfos(taskId, filteredTasks[i]['subTasks']);
            changeAssignedTos(taskId, filteredTasks[i]['assignedTo']);
            changePriorityImg(taskId, filteredTasks[i]['priority']);
            changeArrows(taskId);
        }
    }
}


/**
 * Renders the "Done" tasks section of the tasks board.
 *
 * This function updates the HTML content of the "Done" task container. It first clears any existing content and then populates it with tasks that have a status of "done". If there are no tasks, a message is displayed indicating that no tasks are done. For each task, the function creates HTML elements and sets up event handlers for interactions such as showing details, dragging, and dropping.
 *
 * - Updates the inner HTML of the container with the ID `taskContainerContentDone`.
 * - Displays a message if no tasks are available.
 * - Renders each task with its details, including category, title, description, progress, assigned users, and priority.
 * - Applies additional visual changes and functionalities such as category color, progress info, assigned users, and priority images.
 *
 * @returns {void}
 *
 * @example
 * // Example usage:
 * // Calls this function to render the "Done" tasks section on the board.
 * renderDoneBoard();
 */
function renderDoneBoard() {
    document.getElementById('taskContainerContentDone').innerHTML = ``;
    filteredTasks = tasks.filter(task => task.status === "done");
    if (filteredTasks.length < 1) {
        document.getElementById('taskContainerContentDone').innerHTML =/*html*/ `
        <div class="noTaskContainer">
            <div class="noTaskText">No tasks done</div>
        </div>
        `
    } else {
        for (let i = 0; i < filteredTasks.length; i++) {
            let taskId = filteredTasks[i]['id'];
            document.getElementById('taskContainerContentDone').innerHTML += /*html*/ `
                <div class="task" id="${taskId}" onclick="showTask(${taskId})" draggable="true" ondragstart="draggingStart(${taskId})" ondragend="draggingEnd(${taskId})">
                    <div class="taskHeadlineBoard">
                        <div class="taskCategory" id="category${taskId}">${filteredTasks[i]['category']}</div>
                        <div class="taskHeadlineBoardArrows">
                            <img class="boardArrow down" src="../assets/img/boardArrow.svg" id="arrowDown${taskId}" alt="" onclick="event.stopPropagation(), statusOneUp(${taskId})">
                            <img class="boardArrow up"src="../assets/img/boardArrow.svg" id="arrowUp${taskId}" alt="" onclick="event.stopPropagation(), statusOneDown(${taskId})">
                        </div>
                    </div>
                    <span class="taskTitle">${filteredTasks[i]['title']}</span>
                    <span class="taskDescription">${filteredTasks[i]['description']}</span>
                        <div class="progressContainer" id="progressContainer${taskId}">
                            <div class="progressBar">
                                <div class="progress" id="progress${taskId}"></div>
                            </div>
                            <div class="progressText"><span id="progressCounter${taskId}"></span>/<span id="progressMax${taskId}">5</span> Subtasks</div>
                            </div>
                            <div class="taskBottom">
                                <div class="assignedTo" id="assignedTo${taskId}">
                                    <div class="userIcon">
                                        <div class="userInitials">NS</div>
                                    </div>
                                </div>
                                <div id="priority${taskId}" class="taskPriority"></div>
                            </div>
                        </div>
                `;
            changeCategoryColor(taskId, filteredTasks[i]['category']);
            changeProgressInfos(taskId, filteredTasks[i]['subTasks']);
            changeAssignedTos(taskId, filteredTasks[i]['assignedTo'])
            changePriorityImg(taskId, filteredTasks[i]['priority']);
            changeArrows(taskId);
        }
    }
}