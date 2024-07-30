/**
 * The user currently logged in, loaded from the session storage.
 * @type {Array}
 */
let currentUser = []; 

/**
 * The URL of the current page, used to navigate back from the HELP, LEGAL NOTICE, or PRIVACY POLICY pages.
 * @type {string}
 */
let currentPage = ''; 

/**
 * List of users.
 * @type {Array}
 */
let users = [];

/**
 * List of contacts.
 * @type {Array}
 */
let contacts = [];

/**
 * List of tasks.
 * @type {Array}
 */
let tasks = [];

const BASE_URL = 'https://remotestoragejoin-d0140-default-rtdb.europe-west1.firebasedatabase.app/';

/**
 * Loads users from the Firebase Realtime Database.
 *
 * @async
 * @function loadUsers
 * @param {string} [path="/users"] - The path to the users data in the Firebase Realtime Database.
 * @returns {Promise<void>} A promise that resolves when the users data is loaded.
 */
async function loadUsers(path = "/users") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJSON = await response.json();
    users = responseToJSON;
};

/**
 * Loads contacts from the Firebase Realtime Database.
 *
 * @async
 * @function loadContacts
 * @param {string} [path="/contacts"] - The path to the contacts data in the Firebase Realtime Database.
 * @returns {Promise<Array>} A promise that resolves to the contacts data.
 */
async function loadContacts(path = "/contacts") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJSON = await response.json();
    contacts = responseToJSON;
    return contacts;
};

/**
 * Loads tasks from the Firebase Realtime Database.
 *
 * @async
 * @function loadTasks
 * @param {string} [path="/tasks"] - The path to the tasks data in the Firebase Realtime Database.
 * @returns {Promise<void>} A promise that resolves when the tasks data is loaded.
 */
async function loadTasks(path = "/tasks") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJSON = await response.json();
    tasks = responseToJSON;
};

/**
 * Saves users to the Firebase Realtime Database.
 *
 * @async
 * @function saveUsers
 * @param {string} [path="/users"] - The path to the users data in the Firebase Realtime Database.
 * @returns {Promise<void>} A promise that resolves when the users data is saved.
 */
async function saveUsers(path = "/users") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(users)
    });
}

/**
 * Saves contacts to the Firebase Realtime Database.
 *
 * @async
 * @function saveContacts
 * @param {string} [path="/contacts"] - The path to the contacts data in the Firebase Realtime Database.
 * @returns {Promise<void>} A promise that resolves when the contacts data is saved.
 */
async function saveContacts(path = "/contacts") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contacts)
    });
}

/**
 * Saves tasks to the Firebase Realtime Database.
 *
 * @async
 * @function saveTasks
 * @param {string} [path="/tasks"] - The path to the tasks data in the Firebase Realtime Database.
 * @returns {Promise<void>} A promise that resolves when the tasks data is saved.
 */
async function saveTasks(path = "/tasks") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tasks)
    });
}

/**
 * Checks if a user is stored in the session storage.
 *
 * If no user is found, the function redirects to the login page.
 *
 * @function checkUser
 */
function checkUser() {
    let storedUserString = sessionStorage.getItem('currentUser');
    if (storedUserString) {
        currentUser = JSON.parse(storedUserString);
    } else {
        window.location.href = '../index.html';
    }
}

/**
 * Fills the user initials in the header container.
 *
 * This function sets the inner HTML of the element with the ID 'headerContainerRightUserIconInitials'
 * to the initials of the current user.
 *
 * @function fillUserInitials
 */
function fillUserInitials() {
    document.getElementById('headerContainerRightUserIconInitials').innerHTML = currentUser['initials'];
}

/**
 * Logs out the user by clearing the session and local storage.
 *
 * This function then redirects to the login page.
 *
 * @function logout
 */
function logout() {
    sessionStorage.clear();
    window.location.href = 'https://join-268.developerakademie.net/index.html';
}

/**
 * Saves the current page URL to the session storage.
 *
 * This function extracts the current page's name from the URL and saves it in the session storage
 * under the key 'currentPage'.
 *
 * @function saveCurrentPage
 */
function saveCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop();

    // Save the current page name in sessionStorage
    sessionStorage.setItem("currentPage", currentPage);
}

/**
 * Toggles the visibility of the mobile header menu.
 *
 * This function checks the current position of the mobile menu element with the ID 'headerMobileMenu'.
 * If the menu is hidden (right position is '-180px'), it moves the menu into view (right position '10px').
 * If the menu is visible, it hides the menu by moving it out of view (right position '-180px').
 */
function showHeaderMenu(){
    if(document.getElementById('headerMobileMenu').style.right == "-180px"){
    document.getElementById('headerMobileMenu').style.right = "10px"}
    else{
        document.getElementById('headerMobileMenu').style.right = "-180px"
    };
}