/**
 * Saves the name of the current page to sessionStorage.
 *
 * This function extracts the name of the current page from the URL path by splitting the `window.location.pathname` and taking the last segment of the path. 
 * It then stores this page name in `sessionStorage` under the key "currentPage".
 */
function saveCurrentPage() {
    let currentPage = window.location.pathname.split("/").pop();
    sessionStorage.setItem("currentPage", currentPage);
}


/**
 * Executes a starting animation by applying CSS class changes after specified delays.
 *
 * This function performs two actions with timing:
 * 1. After a 500-millisecond delay, it adds the CSS class `startingImgEndPos` to the element with the ID `startingImg`, initiating the end position of the starting image animation.
 * 2. After a 2100-millisecond delay, it adds the CSS class `dnone` to the element with the ID `startingBackground`, effectively hiding the background element.
 */
function startingAnimation() {
    setTimeout(() => { document.getElementById('startingImg').classList.add('startingImgEndPos') }, 500);
    setTimeout(() => { document.getElementById('startingBackground').classList.add('dnone') }, 2100);
}