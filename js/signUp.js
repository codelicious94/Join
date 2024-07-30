/**
 * Indicates whether the password field is filled.
 * @type {boolean}
 */
let passwordFilled = false;

/**
 * Indicates whether the confirm password field is filled.
 * @type {boolean}
 */
let confirmPasswordFilled = false;

/**
 * Indicates whether the privacy policy is accepted.
 * @type {boolean}
 */
let privacyPolicyAccepted = false;

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
 * Base URL for the Firebase Realtime Database.
 * @constant {string}
 */
const BASE_URL = "https://remotestoragejoin-d0140-default-rtdb.europe-west1.firebasedatabase.app";

/**
 * List of user colors.
 * @constant {Array<string>}
 */
const userColors = [
    '#FF7A00', '#FF5EB3', '#6E52FF', '#9327FF', '#00BEE8', '#1FD7C1', '#FF745E', '#FFA35E', '#FC71FF',
    '#FFC701', '#0038FF', '#C3FF2B', '#FFE62B', '#FF4646', '#FFBB2B',
];

/**
 * Initializes the application by loading users and contacts.
 *
 * @function init
 * @returns {void}
 */
function init() {
    loadUsers();
    loadContacts();
    saveCurrentPage();
}

function saveCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop();

    // Speichern des Seitennamens in sessionStorage
    sessionStorage.setItem("currentPage", currentPage);
}

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
 * @returns {Promise<void>} A promise that resolves when the contacts data is loaded.
 */
async function loadContacts(path = "/contacts") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJSON = await response.json();
    contacts = responseToJSON;
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
 * Toggles the display of check and checked images.
 *
 * This function switches the display between 'checkImg' and 'checkedImg' elements,
 * updates the 'privacyPolicyAccepted' flag, and calls enableDisableButton() to manage
 * the state of the sign-up button.
 *
 * @function changeCheckImg
 * @returns {void}
 */
function changeCheckImg() {
    if (document.getElementById('checkedImg').style.display == 'none') {
        document.getElementById('checkImg').style.display = 'none';
        document.getElementById('checkedImg').style.display = 'block';
        privacyPolicyAccepted = true;
        enableDisableButton();
    } else {
        document.getElementById('checkImg').style.display = 'block';
        document.getElementById('checkedImg').style.display = 'none';
        privacyPolicyAccepted = false;
        enableDisableButton();
    }
}

/**
 * Changes the password icon based on the password input field.
 *
 * This function updates the 'passwordIcon' image source based on whether the 'signUpPassword'
 * input field is filled or empty. It also manages the 'passwordFilled' flag.
 *
 * @function changePasswordIcon
 * @returns {void}
 */
function changePasswordIcon() {
    if (!document.getElementById('signUpPassword').value == '' && passwordFilled == false) {
        document.getElementById('passwordIcon').src = '../assets/img/visibility_off.svg';
        passwordFilled = true;
    }
    else if (document.getElementById('signUpPassword').value == '') {
        document.getElementById('passwordIcon').src = '../assets/img/lock.svg';
        document.getElementById("signUpPassword").type = "password";
        passwordFilled = false;
    }
}

function changeConfirmPasswordIcon() {
    if (!document.getElementById('signUpConfirmPassword').value == '' && confirmPasswordFilled == false) {
        document.getElementById('confirmPasswordIcon').src = '../assets/img/visibility_off.svg';
        passwordFilled = true;
    }
    else if (document.getElementById('signUpConfirmPassword').value == '') {
        document.getElementById('confirmPasswordIcon').src = '../assets/img/lock.svg';
        document.getElementById("signUpConfirmPassword").type = "password";
        passwordFilled = false;
    }
}

/**
 * Toggles the visibility of the password input field.
 *
 * This function switches the 'signUpPassword' input field type between 'password' and 'text'
 * based on its current type and updates the 'passwordIcon' image source accordingly.
 *
 * @function toggleVisibilityPasswordIcon
 * @returns {void}
 */
function toggleVisibilityConfirmPasswordIcon() {
    if (document.getElementById("signUpConfirmPassword").type === "password" && passwordFilled == true) {
        document.getElementById('confirmPasswordIcon').src = '../assets/img/visibility.svg';
        document.getElementById("signUpConfirmPassword").type = "text";
    }
    else if (document.getElementById("signUpConfirmPassword").type === "text" && passwordFilled == true) {
        document.getElementById('confirmPasswordIcon').src = '../assets/img/visibility_off.svg';
        document.getElementById("signUpConfirmPassword").type = "password";
    }
}

function toggleVisibilityPasswordIcon() {
    if (document.getElementById("signUpPassword").type === "password" && passwordFilled == true) {
        document.getElementById('passwordIcon').src = '../assets/img/visibility.svg';
        document.getElementById("signUpPassword").type = "text";
    }
    else if (document.getElementById("signUpPassword").type === "text" && passwordFilled == true) {
        document.getElementById('passwordIcon').src = '../assets/img/visibility_off.svg';
        document.getElementById("signUpPassword").type = "password";
    }
}

/**
 * Enables or disables the sign-up button based on form validation.
 *
 * This function checks if the privacy policy is accepted and all required input fields
 * (name, email, password, confirm password) are filled. It then enables or disables the
 * 'signUpButton' accordingly.
 *
 * @function enableDisableButton
 * @returns {void}
 */
function enableDisableButton() {
    if ((privacyPolicyAccepted)
        && (!document.getElementById('signUpName').value == '')
        && (!document.getElementById('signUpEmail').value == '')
        && (!document.getElementById('signUpPassword').value == '')
        && (!document.getElementById('signUpConfirmPassword').value == '')) { 
        document.getElementById('signUpButton').disabled = false; 
    } else { 
        document.getElementById('signUpButton').disabled = true; 
    }
}

/**
 * Changes the border color of the name input container to blue.
 *
 * @function changeBordorColorName
 * @returns {void}
 */
function changeBordorColorName() {
    document.getElementById('inputContainerName').style.border = "1px solid #29ABE2";
}

/**
 * Resets the border color of the name input container to its original color.
 *
 * @function originalBorderColorName
 * @returns {void}
 */
function originalBorderColorName() {
    document.getElementById('inputContainerName').style.border = "1px solid #D1D1D1";
}

/**
 * Changes the border color of the email input container to blue.
 *
 * @function changeBordorColorEmail
 * @returns {void}
 */
function changeBordorColorEmail() {
    document.getElementById('inputContainerEmail').style.border = "1px solid #29ABE2";
}

/**
 * Resets the border color of the email input container to its original color.
 *
 * @function originalBorderColorEmail
 * @returns {void}
 */
function originalBorderColorEmail() {
    document.getElementById('inputContainerEmail').style.border = "1px solid #D1D1D1";
}

/**
 * Changes the border color of the password input container to blue.
 *
 * @function changeBordorColorPassword
 * @returns {void}
 */
function changeBordorColorPassword() {
    document.getElementById('inputContainerPassword').style.border = "1px solid #29ABE2";
}

/**
 * Resets the border color of the password input container to its original color.
 *
 * @function originalBorderColorPassword
 * @returns {void}
 */
function originalBorderColorPassword() {
    document.getElementById('inputContainerPassword').style.border = "1px solid #D1D1D1";
}

/**
 * Changes the border color of the confirm password input container to blue.
 *
 * @function changeBordorColorConfirmPassword
 * @returns {void}
 */
function changeBordorColorConfirmPassword() {
    document.getElementById('inputContainerConfirmPassword').style.border = "1px solid #29ABE2";
}

/**
 * Resets the border color of the confirm password input container to its original color.
 *
 * @function originalBorderColorConfirmPassword
 * @returns {void}
 */
function originalBorderColorConfirmPassword() {
    document.getElementById('inputContainerConfirmPassword').style.border = "1px solid #D1D1D1";
}

/**
 * Handles the sign-up process.
 *
 * This function checks if the password and confirm password fields match. If they do,
 * it pushes the user data and contacts, saves them to the database, clears the input fields,
 * and displays a success message. If they don't match, it displays an error message.
 *
 * @async
 * @function signUp
 * @param {Event} event - The event object.
 * @returns {Promise<void>} A promise that resolves when the sign-up process is complete.
 */
async function signUp(event) {
    event.preventDefault();
    if (document.getElementById('signUpPassword').value == document.getElementById('signUpConfirmPassword').value) {
        document.getElementById('inputContainerConfirmPassword').style.border = "1px solid #D1D1D1";
        document.getElementById('errorMessage').style.display = "none";
        pushUser();
        pushContacts();
        await saveUsers();
        await saveContacts();
        clearInputs();
        signUpSuccess();
    }
    else {
        document.getElementById('inputContainerConfirmPassword').style.border = "1px solid #FF8190";
        document.getElementById('errorMessage').style.display = "block";
    }
}

/**
 * Creates a user object and pushes it to the users array.
 *
 * This function collects the user's name, email, password, and generates initials,
 * a random color, and an ID. It then creates a user object and adds it to the users array.
 *
 * @function pushUser
 * @returns {void}
 */
function pushUser() {
    let name = document.getElementById('signUpName').value;
    let email = document.getElementById('signUpEmail').value;
    let password = document.getElementById('signUpPassword').value;
    let initials = getInitials(name);
    let color = randomColor(userColors);
    let id = new Date().getTime();
    let phone = '';
    let User = {
        'color': `${color}`,
        'email': `${email}`,
        'id': Number(id),
        'initials': `${initials}`,
        'name': `${name}`,
        'password': `${password}`,
        'phone': `${phone}`
    };
    users.push(User);
}

/**
 * Creates a contact object and pushes it to the contacts array.
 *
 * This function collects the user's name, email, and generates initials,
 * a random color, and an ID. It then creates a contact object and adds it to the contacts array.
 *
 * @function pushContacts
 * @returns {void}
 */
function pushContacts() {
    let name = document.getElementById('signUpName').value;
    let email = document.getElementById('signUpEmail').value;
    let initials = getInitials(name);
    let color = randomColor(userColors);
    let id = new Date().getTime();
    let phone = '';
    let contact = {
        'color': `${color}`,
        'email': `${email}`,
        'id': Number(id),
        'initials': `${initials}`,
        'name': `${name}`,
        'phone': `${phone}`
    };
    contacts.push(contact);
}

/**
 * Generates initials from the given name.
 *
 * This function takes a full name, trims it, splits it into words, and returns the initials.
 * If the name consists of a single word, the first character is returned as the initial.
 * If the name consists of two words, the initials of the first and second words are returned.
 *
 * @function getInitials
 * @param {string} name - The full name from which to generate initials.
 * @returns {string} The generated initials.
 */
function getInitials(name) {
    let words = name.trim().split(/\s+/);

    if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
    }

    let initials = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    return initials;
}

/**
 * Returns a random color from the given array of colors.
 *
 * This function generates a random index based on the length of the colors array
 * and returns the color at that index.
 *
 * @function randomColor
 * @param {string[]} colors - An array of color strings.
 * @returns {string} A randomly selected color.
 */
function randomColor(colors) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

/**
 * Validates the name input field.
 *
 * This function checks if the name input field contains at least a first name
 * and a last name. If the validation fails, it sets a custom validation message.
 *
 * @function validateName
 * @returns {void}
 */
function validateName() {
    let input = document.getElementById('signUpName');
    let name = input.value.trim();
    let nameParts = name.split(' ');

    if (nameParts.length >= 2 && nameParts[0].length > 0 && nameParts[1].length > 0) {
        input.setCustomValidity('');
    } else {
        input.setCustomValidity('Please enter your first name and last name.');
    }
}

/**
 * Validates the email input field.
 *
 * This function checks if the email input field contains a valid email address.
 * If the validation fails, it sets a custom validation message.
 *
 * @function validateEmail
 * @returns {void}
 */
function validateEmail() {
    let input = document.getElementById('signUpEmail');
    let email = input.value.trim();
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let allowedTLDs = ['com', 'net', 'org', 'info', 'biz', 'edu', 'gov', 'mil', 
                       'de', 'at', 'ch', 'fr', 'it', 'es', 'uk', 'us', 'ca', 
                       'au', 'jp', 'cn', 'ru', 'in', 'br', 'mx', 
                       'app', 'blog', 'shop', 'tech', 'design', 'news', 'me', 
                       'xyz', 'online', 'io'];
    
    if (emailPattern.test(email)) {
        let domain = email.split('@')[1];
        let tld = domain.split('.').pop().toLowerCase();
        if (allowedTLDs.includes(tld)) {
            input.setCustomValidity('');
        } else {
            input.setCustomValidity('Please enter an email with an allowed TLD (ending)');
        }
    } else {
        input.setCustomValidity('Please enter a valid email.');
    }
}

/**
 * Validates the password input field.
 *
 * This function checks if the password input field meets the specified criteria:
 * at least 4 characters long, contains uppercase and lowercase letters, a number,
 * and a special character. If the validation fails, it sets a custom validation message.
 *
 * @function validatePassword
 * @returns {void}
 */
function validatePassword() {
    let input = document.getElementById('signUpPassword');
    let password = input.value.trim();

    // Example password validation criteria:
    // - At least 4 characters long
    // - Contains at least one uppercase letter
    // - Contains at least one lowercase letter
    // - Contains at least one digit
    // - Contains at least one special character
    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;

    if (passwordPattern.test(password)) {
        input.setCustomValidity('');
    } else {
        input.setCustomValidity('The password must be at least 4 characters long and contain uppercase letters, lowercase letters, a number and a special character.');
    }
}

/**
 * Clears the values of the sign-up input fields.
 *
 * This function sets the value of the input fields for name, email, password, and
 * confirm password to an empty string, effectively clearing their contents.
 *
 * @function clearInputs
 * @returns {void}
 */
function clearInputs() {
    document.getElementById('signUpName').value = '';
    document.getElementById('signUpEmail').value = '';
    document.getElementById('signUpPassword').value = '';
    document.getElementById('signUpConfirmPassword').value = '';
}

/**
 * Displays a success message and redirects to the login page.
 *
 * This function shows a black background overlay and a success message. It ensures
 * that the background is visible before showing the success message by introducing
 * a slight delay. After a total delay of 2100ms (including the background and
 * message animation), the function redirects the user to the login page.
 *
 * @function signUpSuccess
 * @returns {void}
 */
function signUpSuccess() {
    document.getElementById('body').classList.add('overflowHidden');
    document.getElementById('blackBackground').style.display = "flex";

    // Delay the display of the success message to ensure the background appears first
    setTimeout(() => {
        document.getElementById('successMessage').classList.add("messageAfter");
    }, 100);

    // Delay redirecting to the login page to allow time for animation
    setTimeout(directToLogin, 2100);
}

/**
 * Redirects the user to the login page.
 *
 * This function changes the current browser location to the login page URL, effectively
 * redirecting the user to that page.
 *
 * @function directToLogin
 * @returns {void}
 */
function directToLogin() {
    window.location.href = 'https://join-268.developerakademie.net/index.html';
}