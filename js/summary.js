let nextUrgentTask = [];


/**
 * Initializes the summary page by performing a series of setup tasks asynchronously.
 *
 * This function performs several actions in sequence to set up the summary page:
 * 1. Calls `checkUserSummary()` to verify user-specific summary information.
 * 2. Awaits the completion of `includeHTML()` to include and render necessary HTML content.
 * 3. Awaits the completion of `loadTasks()` to load and prepare task-related data.
 * 4. Calls `fillUserInitials()` to populate user initials in the summary view.
 * 5. Calls `fillSummaryInfos()` to fill in additional summary information.
 * 6. Calls `showGreetingMobile()` to display a greeting on mobile devices.
 * 7. Saves the current page information to `sessionStorage` using `saveCurrentPage()`.
 */
async function initSummary() {
    checkUserSummary();
    await includeHTML();
    await loadTasks();
    fillUserInitials();
    fillSummaryInfos();
    showGreetingMobile();
    saveCurrentPage();
}


/**
 * Checks for stored user data and updates the page accordingly.
 *
 * This function retrieves the `currentUser` data from `sessionStorage`. If the data is found:
 * - It parses the stored user data and assigns it to the `currentUser` variable.
 * - Depending on whether the `name` property of `currentUser` is 'Guest' or not, it calls `updateGreetingGuest()` or `updateGreetingUser()` to update the greeting on the page.
 * If no user data is found in `sessionStorage`, the function redirects the user to the index page (`../index.html`).
 */
function checkUserSummary() {
    let storedUserString = sessionStorage.getItem('currentUser');
    if (storedUserString) {
        currentUser = JSON.parse(storedUserString);
        if (currentUser['name'] == 'Guest') {
            updateGreetingGuest();
        } else {
            updateGreetingUser();
        }
    } else {
        window.location.href = '../index.html';
    }
}


/**
 * Updates the greeting message based on the current time for a guest user.
 *
 * This function determines the current time and sets a greeting message based on the time of day:
 * - "Good morning!" for times before 12 PM.
 * - "Good afternoon!" for times between 12 PM and 6 PM.
 * - "Good evening!" for times after 6 PM.
 * 
 * The function then updates the HTML content of the elements with IDs `daytimeGreeting` and `daytimeGreetingDesktop` to display the appropriate greeting message.
 */
function updateGreetingGuest() {
    let now = new Date();
    let hours = now.getHours();
    let greeting;
    if (hours < 12) {
        greeting = "Good morning!";
    } else if (hours < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }
    document.getElementById("daytimeGreeting").innerHTML = greeting;
    document.getElementById("daytimeGreetingDesktop").innerHTML = greeting;
}


/**
 * Updates the greeting message and displays the current user's name based on the time of day.
 *
 * This function determines the current time and sets a greeting message based on the time of day:
 * - "Good morning," for times before 12 PM.
 * - "Good afternoon," for times between 12 PM and 6 PM.
 * - "Good evening," for times after 6 PM.
 * 
 * The function then updates the HTML content of the elements with IDs `daytimeGreeting` and `daytimeGreetingDesktop` to display the greeting message.
 * It also updates the HTML content of the elements with IDs `userName` and `userNameDesktop` to show the current user's name, retrieved from the `currentUser` object.
 */
function updateGreetingUser() {
    let now = new Date();
    let hours = now.getHours();
    let greeting;
    if (hours < 12) { greeting = "Good morning,";
    } else if (hours < 18) { greeting = "Good afternoon,";
    } else { greeting = "Good evening,";
    }
    document.getElementById("daytimeGreeting").innerHTML = greeting;
    document.getElementById("daytimeGreetingDesktop").innerHTML = greeting;
    document.getElementById("userName").innerHTML = currentUser['name'];
    document.getElementById("userNameDesktop").innerHTML = currentUser['name'];
}


/**
 * Displays a greeting animation on mobile devices based on the last visited page.
 *
 * If the viewport width is less than 1000 pixels and the last page was 'index.html':
 * - Applies the `opacityZero` class to `startAnimationMobile`.
 * - After 1 second, hides `startAnimationMobile`, shows the `main` element, and applies the `opacityFull` class.
 * Otherwise:
 * - Hides `startAnimationMobile` and shows `main` with the `opacityFull` class immediately.
 */
function showGreetingMobile() {
    let lastPage = sessionStorage.getItem('currentPage');
    let startAnimationMobile = document.getElementById('startAnimationMobile');
    let mainElement = document.getElementById('main');
    
    if (window.innerWidth < 1000 && lastPage === 'index.html') {
        startAnimationMobile.classList.add('opacityZero');
        setTimeout(() => {
            startAnimationMobile.classList.add('dnone');
            mainElement.classList.remove('dnone');
            mainElement.classList.add('opacityFull');
        }, 1000);
    } else {
        startAnimationMobile.classList.add('dnone');
        mainElement.classList.remove('dnone');
        mainElement.classList.add('opacityFull');
    }
}


/**
 * Changes the source of the todo image to the hover state image.
 *
 * This function updates the `src` attribute of the image element with the ID `todoImg` 
 * to point to the hover state image located at `"../assets/img/todoHover.svg"`.
 */
function changeTodoImgHover() {
    document.getElementById('todoImg').src = "../assets/img/todoHover.svg"
}


/**
 * Resets the source of the todo image to the normal state image.
 *
 * This function updates the `src` attribute of the image element with the ID `todoImg` 
 * to point to the normal state image located at `"../assets/img/todoNormal.svg"`.
 */
function changeTodoImgNormal() {
    document.getElementById('todoImg').src = "../assets/img/todoNormal.svg"
}


/**
 * Changes the source of the done image to the hover state image.
 *
 * This function updates the `src` attribute of the image element with the ID `doneImg` 
 * to point to the hover state image located at `"../assets/img/doneHover.svg"`.
 *
 * @returns {void} This function does not return a value.
 */
function changeDoneImgHover() {
    document.getElementById('doneImg').src = "../assets/img/doneHover.svg"
}


/**
 * Resets the source of the done image to the normal state image.
 *
 * This function updates the `src` attribute of the image element with the ID `doneImg` 
 * to point to the normal state image located at `"../assets/img/doneNormal.svg"`.
 */
function changeDoneImgNormal() {
    document.getElementById('doneImg').src = "../assets/img/doneNormal.svg"
}


/**
 * Navigates the user to the board page.
 *
 * This function sets the `window.location.href` to `"./board.html"`, which redirects the browser to the `board.html` page.
 */
function openBoardSite() {
    window.location.href = './board.html';
}


/**
 * Updates the summary statistics on the page based on the current tasks.
 *
 * This function calculates and displays various task statistics by updating the inner HTML of specific elements:
 * - `statTodoCounter`: The number of tasks with status 'toDo'.
 * - `statDoneCounter`: The number of tasks with status 'done'.
 * - `statUrgentCounter`: The number of tasks with priority 'urgent'.
 * - `statTasksInBoardCounter`: The total number of tasks.
 * - `statTasksInProgressCounter`: The number of tasks with status 'inProgress'.
 * - `statAwaitFeedbackCounter`: The number of tasks with status 'awaitingFeedback'.
 * 
 * After updating these counters, it calls `fillTaskMiddleText()` to further update the page.
 */
function fillSummaryInfos() {
    document.getElementById('statTodoCounter').innerHTML = tasks.filter(task => task.status === 'toDo').length;
    document.getElementById('statDoneCounter').innerHTML = tasks.filter(task => task.status === 'done').length;
    document.getElementById('statUrgentCounter').innerHTML = tasks.filter(task => task.priority === 'urgent').length;
    document.getElementById('statTasksInBoardCounter').innerHTML = tasks.length;
    document.getElementById('statTasksInProgressCounter').innerHTML = tasks.filter(task => task.status === 'inProgress').length;
    document.getElementById('statAwaitFeedbackCounter').innerHTML = tasks.filter(task => task.status === 'awaitingFeedback').length;
    fillTaskMiddleText();
}


/**
 * Updates the text for urgent tasks in the task summary.
 *
 * This function checks for tasks with high priority ('urgent') and updates the element with ID `urgentTaskDate` to show the nearest due date.
 * If there are no urgent tasks, it displays "no urgent tasks". Otherwise, it displays the due date of the nearest urgent task.
 */
function fillTaskMiddleText() {
    let urgentTasks = tasks.filter(task => task.priority === 'urgent');
    if (urgentTasks.length === 0) {
        document.getElementById('urgentTaskDate').innerHTML = 'no urgent tasks';
        return;
    }
    let today = new Date();
    let nearestTask = urgentTasks.reduce((nearest, task) => {
        return Math.abs(new Date(task.dueDate) - today) < Math.abs(new Date(nearest.dueDate) - today) ? task : nearest;
    });
    document.getElementById('urgentTaskDate').innerHTML = new Date(nearestTask.dueDate).toDateString();
}


/**
 * Formats a date string into a more readable format.
 *
 * This function takes a date string, converts it to a `Date` object, and then formats it into a human-readable string
 * in the format "Month Day, Year" (e.g., "July 24, 2024").
 *
 * @param {string} dateString - The date string to be formatted. This should be a valid date string that can be parsed by the `Date` constructor.
 * @returns {string} The formatted date string in the format "Month Day, Year".
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
