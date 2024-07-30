/**
 * Loads and includes HTML content into elements with the attribute 'w3-include-html'.
 *
 * This asynchronous function searches for all elements with the 'w3-include-html' attribute,
 * fetches the HTML content from the file specified in the attribute, and inserts the content
 * into the element. If the fetch request fails, it sets the inner HTML to an error message.
 *
 * @async
 * @function includeHTML
 * @returns {Promise<void>} A promise that resolves when all HTML content is loaded and included.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}