/**
 * Initializes the privacy policy section.
 *
 * This async function ensures the includeHTML() function is completed before proceeding.
 * If the currentUser is null, it hides certain UI elements with a slight delay to ensure they are fully loaded.
 *
 * @async
 * @function initPrivacyPolicy
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initPrivacyPolicy() {
    await includeHTML(); // Ensure includeHTML() has completed
    storedUserString = sessionStorage.getItem('currentUser');
    if (!storedUserString) {
        hideHeaderContainerRight();
        hideDesktopContainer(); 
    } else{
        currentUser = JSON.parse(storedUserString);
        fillUserInitials();
    };
}


/**
 * Hides the right section of the header container by setting the display style of its elements to `none`.
 *
 * This function sets the `display` style property to `none` for the elements with IDs `headerContainerRightUserIcon` and `headerContainerRightHelp`.
 * This effectively hides these elements from view.
 */
function hideHeaderContainerRight() {
    document.getElementById('headerContainerRightUserIcon').style = 'display:none;';
    document.getElementById('headerContainerRightHelp').style = 'display:none;';
}


/**
 * Hides the desktop container and the aside middle section by setting their display style to `none`.
 *
 * This function sets the `display` style property to `none` for the elements with IDs `desktopContainer` and `asideMiddle`, 
 * effectively making these elements invisible on the page.
 */
function hideDesktopContainer() {
    document.getElementById('desktopContainer').style = "display: none;";
    document.getElementById('asideMiddle').style = 'display:none;';
}


/**
 * Navigates the user back to the previous page in the browser's history.
 *
 * This function uses `window.history.go(-1)` to move one step backward in the browser's history stack,
 * effectively taking the user to the last page they visited.
 */
function backToLastPage() {
    window.history.go(-1);
}


/**
 * Loads data from the Firebase Realtime Database.
 *
 * This async function fetches data from the specified path in the Firebase Realtime Database,
 * logs the JSON response to the console, and updates the inner HTML of the element with the ID 'container'
 * to display the 'name' property from the fetched data.
 *
 * @async
 * @function loadData
 * @param {string} [path=""] - The path to the data in the Firebase Realtime Database.
 * @returns {Promise<void>} A promise that resolves when the data is loaded and displayed.
 */
async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJSON = await response.json();
    console.log(responseToJSON);
    document.getElementById('container').innerHTML = responseToJSON['name'];
}