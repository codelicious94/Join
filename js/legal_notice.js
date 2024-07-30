/**
 * Initializes the legal policy section.
 *
 * This async function ensures the includeHTML() function is completed before proceeding.
 * If the currentUser is null, it hides certain UI elements with a slight delay to ensure they are fully loaded.
 *
 * @async
 * @function initLegalPolicy
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initLegalNotice() {
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
 * Hides the right-side header container elements.
 *
 * This function sets the display style to 'none' for the user icon and help elements
 * in the right-side header container.
 *
 * @function hideHeaderContainerRight
 */
function hideHeaderContainerRight() {
    document.getElementById('headerContainerRightUserIcon').style = 'display:none;';
    document.getElementById('headerContainerRightHelp').style = 'display:none;';
    document.getElementById('asideMiddle').style = 'display:none;';
}


/**
 * Hides the desktop container.
 *
 * This function sets the display style to 'none' for the desktop container element.
 *
 * @function hideDesktopContainer
 */
function hideDesktopContainer() {
    document.getElementById('desktopContainer').style = "display: none;";
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