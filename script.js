let rememberMe = false;
let passwordFilled = false;
let confirmPasswordFilled = false;
let privacyPolicyAccepted = false;
let users = [];
let contacts = [];
let currentUser = [];
const BASE_URL = "https://remotestoragejoin-d0140-default-rtdb.europe-west1.firebasedatabase.app"
const userColors = [
    '#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF',
    '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B',
];


/**
 * Initializes the application by performing a series of setup tasks.
 *
 * This function is called to perform the following actions in sequence:
 * 1. Executes the `startingAnimation()` function to initiate the starting animation for the page.
 * 2. Loads user data by calling `loadUsers()`.
 * 3. Checks for any existing current user data with `checkCurrentUser()`.
 * 4. Enables or disables the login button based on input field values using `enableDisableButton()`.
 * 5. Updates the password icon based on current state with `changePasswordIcon()`.
 * 6. Clears any existing data in `sessionStorage` to ensure a fresh state.
 * 7. Saves the current page information to `sessionStorage` using `saveCurrentPage()`.
 */
function init() {
    startingAnimation();
    loadUsers();
    checkCurrentUser();
    enableDisableButton();
    changePasswordIcon();
    sessionStorage.clear();
    saveCurrentPage();
    localStorage.clear();
}


/**
 * Loads the list of users from the database.
 *
 * This function sends an HTTP GET request to the server to retrieve a list of users in JSON format.
 * The URL is constructed by concatenating BASE_URL and the specified path.
 * The fetched data is then stored in the `users` variable.
 *
 * @param {string} [path="/users"] - The path to the user list, defaulting to "/users".
 * @returns {Promise<void>} A promise that resolves when the data is loaded.
 * @throws {Error} If the request fails or the response is not valid JSON.
 */
async function loadUsers(path = "/users") {
    let response = await fetch(BASE_URL + path + ".json");
    let reponseToJSON = await response.json();
    users = reponseToJSON;
};


/**
 * Checks for a currently stored user in the local storage.
 *
 * This function retrieves the string representation of the currently stored user from localStorage under the key 'currentUser'.
 * If a user is found, it parses the string into an object and assigns it to the `currentUser` variable.
 * It then calls the `fillStoredUserInfos` function to populate user-specific information.
 */
function checkCurrentUser() {
    let storedUserString = localStorage.getItem('currentUser');
    if (storedUserString) {
        currentUser = JSON.parse(storedUserString);
        fillStoredUserInfos();
    }
}


/**
 * Saves the current list of users to the database.
 *
 * This function sends an HTTP PUT request to the server to update the list of users.
 * The URL is constructed by concatenating BASE_URL and the specified path.
 * The users data is converted to a JSON string and sent as the request body.
 *
 * @param {string} [path="/users"] - The path where the users data should be saved, defaulting to "/users".
 * @returns {Promise<Response>} A promise that resolves with the server's response to the request.
 * @throws {Error} If the request fails or the server responds with an error status.
 */
async function saveUsers(path = "/users") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(users)
    });
}


/**
 * Saves the current list of contacts to the database.
 *
 * This function sends an HTTP PUT request to the server to update the list of contacts.
 * The URL is constructed by concatenating BASE_URL and the specified path.
 * The contacts data is converted to a JSON string and sent as the request body.
 *
 * @param {string} [path="/contacts"] - The path where the contacts data should be saved, defaulting to "/contacts".
 * @returns {Promise<Response>} A promise that resolves with the server's response to the request.
 * @throws {Error} If the request fails or the server responds with an error status.
 */
async function saveContacts(path = "/contacts") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contacts)
    });
}


/**
 * Fills the login form with the stored user information.
 *
 * This function sets the email and password fields of the login form with the corresponding values
 * from the `currentUser` object. It also updates the display properties of elements related to the
 * "Remember Me" functionality, indicating that the user has opted to be remembered.
 */
function fillStoredUserInfos() {
    document.getElementById('loginEmail').value = currentUser['email'];
    document.getElementById('loginPassword').value = currentUser['password'];
    document.getElementById('rememberCheckedImg').style.display = 'block';
    document.getElementById('rememberImg').style.display = 'none';
    rememberMe = true;
}


/**
 * Toggles the display of the "Remember Me" images and updates the corresponding state.
 *
 * This function checks the current display state of the 'rememberImg' element.
 * If the 'rememberImg' element is not visible, it hides the 'rememberCheckedImg' and shows the 'rememberImg', 
 * setting the `rememberMe` flag to `false`. Otherwise, it shows the 'rememberCheckedImg' and hides the 'rememberImg', 
 * setting the `rememberMe` flag to `true`.
 */
function changeRememberImg() {
    if (document.getElementById('rememberImg').style.display == 'none') {
        document.getElementById('rememberCheckedImg').style.display = 'none';
        document.getElementById('rememberImg').style.display = 'block';
        rememberMe = false;
    } else {
        document.getElementById('rememberCheckedImg').style.display = 'block';
        document.getElementById('rememberImg').style.display = 'none';
        rememberMe = true;

    }
}

/**
 * Updates the password icon and input type based on the content of the password field.
 *
 * This function checks the content of the password input field and updates the icon displayed next to it accordingly:
 * - If the password field is not empty and `passwordFilled` is `false`, it sets the icon to indicate visibility (e.g., an eye with a line through it) and updates `passwordFilled` to `true`.
 * - If the password field is empty, it changes the icon to indicate a locked state (e.g., a lock icon), sets the input type back to "password", and updates `passwordFilled` to `false`.
 */
function changePasswordIcon() {
    if (!document.getElementById('loginPassword').value == '' && passwordFilled == false) {
        document.getElementById('passwordIcon').src = '../assets/img/visibility_off.svg';
        passwordFilled = true;
    } else if (document.getElementById('loginPassword').value == '') {
        document.getElementById('passwordIcon').src = '../assets/img/lock.svg';
        document.getElementById("loginPassword").type = "password";
        passwordFilled = false;
    }
}


/**
 * Toggles the visibility of the password and updates the associated icon.
 *
 * This function switches the password input field between "password" and "text" types, allowing the user to show or hide their password. It also updates the icon next to the password field to reflect the current visibility state:
 * - If the input type is "password" and `passwordFilled` is `true`, it sets the icon to indicate visibility (e.g., an eye icon) and changes the input type to "text" to show the password.
 * - If the input type is "text" and `passwordFilled` is `true`, it sets the icon to indicate hidden (e.g., an eye with a line through it) and changes the input type to "password" to hide the password.
 */
function toggleVisibilityPasswordIcon() {
    if (document.getElementById("loginPassword").type === "password" && passwordFilled == true) {
        document.getElementById('passwordIcon').src = '../assets/img/visibility.svg';
        document.getElementById("loginPassword").type = "text";
    } else if (document.getElementById("loginPassword").type === "text" && passwordFilled == true) {
        document.getElementById('passwordIcon').src = '../assets/img/visibility_off.svg';
        document.getElementById("loginPassword").type = "password";
    }
}


/**
 * Enables or disables the login button based on the presence of input in the email and password fields.
 *
 * This function checks if both the email and password input fields are non-empty:
 * - If both fields contain values, it enables the login button by setting its `disabled` property to `false`.
 * - If either of the fields is empty, it disables the login button by setting its `disabled` property to `true`.
 */
function enableDisableButton() {
    if ((!document.getElementById('loginEmail').value == '') &&
        (!document.getElementById('loginPassword').value == '')) {
        document.getElementById('loginBtn').disabled = false;
    } else {
        document.getElementById('loginBtn').disabled = true;
    }
}


/**
 * Changes the border color of the email input container.
 *
 */
function changeBordorColorEmail() {
    document.getElementById('inputContainerEmail').style.border = "1px solid #29ABE2";
}


/**
 * Resets the border color of the email input container to its original state.
 *
 */
function originalBorderColorEmail() {
    document.getElementById('inputContainerEmail').style.border = "1px solid #D1D1D1";
}


/**
 * Changes the border color of the password input container.
 *
 */
function changeBordorColorPassword() {
    document.getElementById('inputContainerPassword').style.border = "1px solid #29ABE2";
}


/**
 * Resets the border color of the password input container to its original state.
 *
 */
function originalBorderColorPassword() {
    document.getElementById('inputContainerPassword').style.border = "1px solid #D1D1D1";
}


/**
 * Handles the login form submission.
 *
 * This function is called when the login form is submitted. It prevents the default form submission behavior
 * using `event.preventDefault()`, and then calls the `checkEmail()` function to perform email validation or processing.
 *
 * @param {Event} event - The event object associated with the form submission.
 * @returns {void} This function does not return a value.
 */
function login(event) {
    event.preventDefault();
    checkEmail();
}


/**
 * Validates the email address entered in the login form.
 *
 * This function retrieves the email value from the email input field and searches for a matching email in the `users` array.
 * - If no user with the specified email is found, it displays a "wrong email" message by removing the 'dnone' class from the message element.
 * - If a user with the specified email is found, it proceeds to check the email and password combination by calling the `checkCombination()` function.
 */
function checkEmail() {
    let email = document.getElementById('loginEmail').value;
    let emailsearch = users.find(user => user.email === email);
    if (!emailsearch) {
        document.getElementById('wrongEmailMsg').classList.remove('dnone');
    } else if (emailsearch) {
        checkCombination();
    }
}


/**
 * Validates the email and password combination entered in the login form.
 *
 * This function retrieves the email and password values from the login form and searches for a matching user in the `users` array.
 * - If no user with the specified email and password combination is found, it displays a "wrong password" message by removing the 'dnone' class from the message element and hides any existing "wrong email" message.
 * - If a user with the matching email and password is found, it sets the `currentUser` variable to the matched user and then calls the `checkRememberMe()` function to handle "Remember Me" functionality.
 */
function checkCombination() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    let combinationSearch = users.find(user => user.email === email && user.password === password);
    if (!combinationSearch) {
        document.getElementById('wrongPasswordMsg').classList.remove('dnone');
        document.getElementById('wrongEmailMsg').classList.add('dnone');
        setTimeout(()=>{document.getElementById('wrongPasswordMsg').classList.add('dnone');},1000);
    } else {
        currentUser = combinationSearch;
        checkRememberMe();
    }
}


/**
 * Handles user data storage based on the "Remember Me" option.
 *
 * This function checks the state of the `rememberMe` flag and stores the current user's data accordingly:
 * - If `rememberMe` is `true`, the user's data is saved in both `localStorage` and `sessionStorage`.
 * - If `rememberMe` is `false`, the user's data is saved only in `sessionStorage`, and `localStorage` is cleared.
 * After updating the storage, the function redirects the user to a summary page by calling `directToSummary()`.
 */
function checkRememberMe() {
    if (rememberMe == true) {
        let currentUserAsString = JSON.stringify(currentUser);
        localStorage.setItem('currentUser', currentUserAsString);
        sessionStorage.setItem('currentUser', currentUserAsString);
    } else if (rememberMe == false) {
        let currentUserAsString = JSON.stringify(currentUser);
        sessionStorage.setItem('currentUser', currentUserAsString);
        localStorage.clear();
    }
    directToSummary();
}


/**
 * Validates the email address entered in the login form.
 *
 * This function retrieves the email input value from the `loginEmail` field, trims any leading or trailing whitespace, and checks if it matches the standard email format using a regular expression pattern.
 * - If the email address matches the pattern, it clears any custom validation messages by setting the validity to an empty string.
 * - If the email address does not match the pattern, it sets a custom validation message indicating that the email address is invalid.
 */
function validateEmail() {
    var input = document.getElementById('loginEmail');
    var email = input.value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
        input.setCustomValidity('');
    } else {
        input.setCustomValidity('Please enter a valid email address.');
    }
}


/**
 * Validates the password entered in the login form.
 *
 * This function retrieves the password input value from the `loginPassword` field, trims any leading or trailing whitespace, and checks if it meets the required criteria using a regular expression pattern.
 * - The password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.
 * - If the password matches the pattern, it clears any custom validation messages by setting the validity to an empty string.
 * - If the password does not match the pattern, it sets a custom validation message indicating the requirements for a valid password.
 */
function validatePassword() {
    var input = document.getElementById('loginPassword');
    var password = input.value.trim();
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    if (passwordPattern.test(password)) {
        input.setCustomValidity('');
    } else {
        input.setCustomValidity('The password must be at least 4 characters long and contain uppercase letters, lowercase letters, a number and a special character.');
    }
}


/**
 * Clears the values of the specified input fields.
 *
 * This function sets the value of the input fields with IDs `loginName` and `loginUpEmail` to empty strings, effectively clearing any text entered by the user.
 */
function clearInputs() {
    document.getElementById('loginName').value = '';
    document.getElementById('loginUpEmail').value = '';
}


/**
 * Directs to summary page
 * 
 */
function directToSummary() {
    window.location.href = '../html/summary.html';
}


/**
 * Simulates a guest login by setting default user data and redirecting to a summary page.
 *
 * This function creates a guest user object with default values for initials and name. It then serializes this object to a JSON string and stores it in `sessionStorage`. 
 * The function also clears any existing data in `localStorage` and redirects the user to a summary page by calling `directToSummary()`.
 */
function guestLogin() {
    let currentUser = {
        "initials": "G",
        "name": "Guest"
    };
    let currentUserAsString = JSON.stringify(currentUser);
    sessionStorage.setItem('currentUser', currentUserAsString);
    localStorage.clear();
    directToSummary();
}


