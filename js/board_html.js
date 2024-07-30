/*-----------------------------------HTML----------------------------------------------------*/

function changeAssignedTosHTML(taskId, i) {
    return /*html*/ `
    <div class="userIcon" id="userIcon${taskId}${i}">
    <div class="userInitials" id="userInitials${taskId}${i}">NS</div>
    <div>
    `;
}

function hideMoreThanFourAndRenderOneEmptyHTML(taskId) {
    return /*html*/ `
    <div class="plusIcon" id="plusIcon${taskId}">
    <div class="plusNumber" id="plusNumber${taskId}"></div>
    <div>
    `;
}

function renderSingleTaskHTML(task, taskId, taskpriority) {
    return /*html*/`
    <div class="singleTaskHead">
        <div id="singleTaskCategory" class="singleTaskCategory">${task['category']}</div>
        <img src="../assets/img/closingCrossBoard.svg" alt="" class="closeSingleTaskImg" onclick="closeSingleView(event)">
    </div>
    <div class="singleTaskTitle">${task['title']}</div>
    <div class="singleTaskDescription">${task['description']}</div>
    <div class="singleTaskDueDate">
        <div>Due Date:</div>
        <div>${task['dueDate']}</div>
    </div>
    <div class="singleTaskPriority">
        <div>Priority:</div>
        <div class="singleTaskPrioritySub">
            <div>${taskpriority}</div>
            <div class="singleTaskPriorityImg class${task['priority']}"></div>
        </div>
    </div>
    <div id="singleTaskAssignedTo" class="singleTaskAssignedTo">AssignedTo</div>
    <div id="singleTaskSubTasks" class="singleTaskSubTasks">Subtasks</div>
    <div class="singleTaskDeleteEdit">
        <div class="singleTaskDelete" onclick="event.stopPropagation(), deleteTask(${taskId})">
            <img src="../assets/img/delete.svg" alt="">
            <div>Delete</div>
        </div>
        <div class="singleTaskDeleteEditSeparator">

        </div>
        <div class="singleTaskDelete" onclick="event.stopPropagation(), editTask(${taskId})">
            <img src="../assets/img/edit.svg" alt="">
            <div>Edit</div>
        </div>
    </div>
`
}

function renderSingleTaskAssignedToHTML(i) {
    return /*html*/ `
    <div class="singleTaskAssignedToSub">
        <div class="userIcon" id="userIconSingleTask${i}">
            <div class="userInitials" id="userInitialsSingleTask${i}"></div>
        </div>
        <div class="singleTaskUserName" id="userNameSingleTask${i}"></div>
    </div>
    `
}



function renderSingleTaskSubtasksHTML(subTask, task) {
    return  /*html*/`
    <div class="subTask">
        <div class="subTaskCheckImg subTaskCompleted${subTask['completet']}" id="checkImg${subTask['id']}" onclick="event.stopPropagation(), changeSubTaskCompletet(${task['id']}, ${subTask['id']})"></div>
        <div>${subTask['content']}</div>
    </div>    
    `
}


function editTaskHTML(taskId) {
    return /*html*/`
    <form class="editForm" name="editForm" id="editForm" onsubmit="event.stopPropagation(), finishEdit(event, ${taskId})">
        <div class="editHead">
            <img src="../assets/img/closingCrossBoard.svg" alt="" class="closeSingleTaskImg" onclick="event.stopPropagation(), closeSingleView(event)">
        </div>
        <label for="editTitle">Title</label>
        <input name="editTitle" id="editTitle" placeholder="Enter a title" oninput="validateTitle()">
        <label for="editDescription">Description</label>
        <textarea name="editDescription" id="editDescription" placeholder="Enter a description" maxlength="160"oninput="validateDescription()"></textarea>
        <label for="editDueDate">Due date</label>
        <input id="editDueDate"
           name="editDueDate"
           type="date"
           min="2022-01-01"
           step="1">
        <label for="editPriority">Priority</label>
        <div class="editPriority" name="editPriority">
            <div class="prioritySub" id="prioritySubUrgent" onclick="event.stopPropagation(), changeChosenPriorityToUrgent(${taskId})">
                <div class="editPriorityText" id="editPriorityUrgentText">Urgent</div>
                <div class="priorityUrgentImgNormal" id="editPriorityUrgentImg"></div>
            </div>
            <div class="prioritySub" id="prioritySubMedium" onclick="event.stopPropagation(), changeChosenPriorityToMedium(${taskId})">
                <div class="editPriorityText" id="editPriorityMediumText">Medium</div>
                <div class="priorityMediumImgNormal" id="editPriorityMediumImg"></div>
            </div>
            <div class="prioritySub" id="prioritySubLow" onclick="event.stopPropagation(), changeChosenPriorityToLow(${taskId})">
                <div class="editPriorityText"id="editPriorityUrgentText">Low</div>
                <div class="priorityLowImgNormal" id="editPriorityLowImg"></div>
            </div>
        </div>
        <div class="editAssignedTo">
            <label for="contactsDropDown">AssignedTo</label onclick="event.stopPropagation()">
            <div id="contactsDropDownInputContainer" onclick="event.stopPropagation()">
                <input placeholder="Select contacts to assign" type="search" id="contactsDropDown" onkeyup="editFilterNames()" onfocus="event.stopPropagation(), setInputContainerBorderColor('contactsDropDownInputContainer')" onblur="resetInputContainerBorderColor('contactsDropDownInputContainer')" onclick="event.stopPropagation()">
                <div class="openCloseChoosingListImg" id="openCloseChoosingListImg" onclick="event.stopPropagation(), toggleShowChoosingList()" ></div>
            </div>
            <div id="choosingList" class="choosingList dnone" onclick="event.stopPropagation()"></div>
            <div class="editAssignedTosChosen" id="editAssignedTosChosenEdit">
            </div>
        </div>
        <label for="editSubTasks">Subtasks</label>
        <div id="editSubTasksInputContainer">
            <input type="text" name="editSubTasks" id="editSubTasks" placeholder="Add new subtask" minlength="5" maxlength="20" onfocus="setInputContainerBorderColor('editSubTasksInputContainer')" onblur="resetInputContainerBorderColor('editSubTasksInputContainer')">
            <img class="addSubTaskImg" src="../assets/img/EditTaskAddSubtask.svg" alt="" onclick="event.stopPropagation(), addSubTask(${taskId})">
        </div>
        <div id ="editSubtasksList" class="editSubtasksList">
        </div>
        <div class="editBottom">
            <button class="editBottomSave"  type="submit">
                <div>Ok</div>
                <img src="../assets/img/checkEditTaskDark.svg" alt="">
            </button>
        </div>
    </form>
    `
}

function renderChoosingListHTML(taskId, color, contact) {
    return /*html*/`
    <div class="choosingListRow" onclick="toggleAssigned(${contact['id']}, ${taskId}), event.stopPropagation()" id="choosingListRow${contact['id']}">
        <div class="choosingListLeft">
            <div class="choosingListUserIcon ${color}">
                <div class="choosingListUserInitials">${contact['initials']}</div>
            </div>
            <div>${contact['name']}</div>
        </div>
        <div class="choosingListCheck" id="choosingListCheckImg${contact['id']}"></div>
    </div>
    `
}

function renderAssignedTosEditHTML(i){
    return /*html*/ `
    <div class="choosingListUserIcon " id="userIconEdit${i}">
        <div class="choosingListUserInitials" id="userInitialsEdit${i}"></div>
    </div>
`
}

function renderSubtasksEditHTML(task, singleSubtask){
    return /*html*/`
    <div class="subTaskEditRow" id="subTaskEditRow${singleSubtask['id']}">
        <div class="subTaskEditName" id="subTaskName${singleSubtask['id']}">&#10625 ${singleSubtask['content']}</div>
        <div class="subTaskEditRowRight">
            <img class="editSubTaskEditImg" src="../assets/img/edit.svg" alt="" onclick="event.stopPropagation(), editEditSubTask(${task['id']},${singleSubtask['id']})">
            <div class="editSubTaskSeparator"></div>
            <img class="editSubTaskDeleteImg" src="../assets/img/delete.svg" alt="" onclick="event.stopPropagation(), deleteEditSubTask(${task['id']},${singleSubtask['id']})">
        </div>
    </div>
    `
}