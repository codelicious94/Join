/**
 * Opens the edit contact popup.
 * 
 * @param {number} id - The ID of the contact to edit.
 */
function openEditContactPopUp(id) {
    const contact = contactsData[id];
  
    if (!contact) {
      console.error(`Contact with ID ${id} not found`);
      return;
    }
  
    const popupContainer = createPopupContainer();
    popupContainer.innerHTML = createPopupContent(contact);
    document.body.appendChild(popupContainer);
  
    setTimeout(() => {
      popupContainer.classList.add("show");
    }, 10);
  }
  
  /**
   * Closes the edit contact popup.
   */
  function closeEditContactPopUp() {
    const popup = document.getElementById("editContactPopup");
    if (popup) {
      popup.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 500);
    }
  }
  
  /**
   * Opens the contact menu popup for a contact.
   * 
   * @param {number} id - The ID of the contact.
   */
  function openContactMenu(id) {
    const contact = contactsData[id];
    const popup = document.createElement("div");
    popup.className = "contactMenuPopup";
    popup.style.position = "fixed";
    popup.innerHTML = createPopupContentFromContactMenu(id);
  
    const popupContainer = createPopupContainerFromContactMenu();
    popupContainer.appendChild(popup);
    document.body.appendChild(popupContainer);
  
    if (window.innerWidth <= 1000) {
      popup.style.animation = "slideIn 0.2s ease forwards";
    }
  
    popupContainer.onclick = function () {
      popup.style.animation = "slideOut 0.2s ease forwards";
      setTimeout(() => {
        document.body.removeChild(popupContainer);
      }, 300);
    };
  }
  
  /**
   * Creates the container for the contact menu popup.
   * 
   * @returns {HTMLDivElement} The div element for the popup container.
   */
  function createPopupContainerFromContactMenu() {
    const popupContainer = document.createElement("div");
    popupContainer.style.position = "fixed";
    popupContainer.style.top = 0;
    popupContainer.style.left = 0;
    popupContainer.style.width = "100%";
    popupContainer.style.height = "100%";
    popupContainer.style.zIndex = 1000;
    return popupContainer;
  }
  
  /**
   * Creates the content for the contact menu popup.
   * 
   * @param {number} id - The ID of the contact.
   * @returns {string} The HTML string for the popup content.
   */
  function createPopupContentFromContactMenu(id) {
    return /*HTML*/ `
      <div class="contactMenuPopupContent" onclick="event.stopPropagation()">
          ${createEditContactOption(id)}
          ${createDeleteContactOption(id)}
      </div>
    `;
  }
  
  /**
   * Creates the edit contact option in the contact menu popup.
   * 
   * @param {number} id - The ID of the contact.
   * @returns {string} The HTML string for the edit contact option.
   */
  function createEditContactOption(id) {
    return /*HTML*/ `
      <div class="editContact" onclick="openEditContactPopUp(${id})">
          <img src="../assets/img/edit.svg" alt="Edit">
          <p>Edit</p>
      </div>
    `;
  }
  
  /**
   * Creates the delete contact option in the contact menu popup.
   * 
   * @param {number} id - The ID of the contact.
   * @returns {string} The HTML string for the delete contact option.
   */
  function createDeleteContactOption(id) {
    return /*HTML*/ `
      <div class="deleteContact" onclick="deleteContact(${id})">
          <img src="../assets/img/delete.svg" alt="Delete">
          <p>Delete</p>                
      </div>
    `;
  }
  
  /* Add New Contact Functions */
  
  /**
   * Adds a new contact to the contact list and saves it.
   * 
   * @async
   * @returns {Promise<void>}
   */
  async function pushContacts() {
    let name = document.getElementById("fullName").value;
    let email = document.getElementById("mail").value;
    let phone = document.getElementById("telNumber").value;
    let initials = getInitials(name);
    let color = randomColor(userColors);
    let id = new Date().getTime();
    let contact = {
      color: `${color}`,
      email: `${email}`,
      id: Number(id),
      initials: `${initials}`,
      name: `${name}`,
      phone: `${phone}`,
    };
    userId = id;
    sessionStorage.setItem("userId", userId);
    contacts.push(contact);
    await saveContacts();
    location.reload();
  }
  
  /**
   * Creates the container element for the add contact popup.
   * 
   * @returns {HTMLDivElement} The div element for the popup container.
   */
  function createPopupContainerFromAddContactPopUp() {
    const popupContainer = document.createElement("div");
    popupContainer.id = "addContactPopup";
    popupContainer.className = "popupContainer";
    return popupContainer;
  }
  
  /**
   * Creates the animation background for the add contact popup.
   * 
   * @returns {string} The HTML string for the animation background.
   */
  function createPopupAnimationBackgroundFromAddContactPopUp() {
    return /*HTML*/ `
      <div class="popupAnimationBackground" onclick="closeAddContactPopUp()">
          ${createPopupContentFromAddContactPopUp()}
      </div>
    `;
  }
  
  /**
   * Creates the content for the add contact popup.
   * 
   * @returns {string} The HTML string for the popup content.
   */
  function createPopupContentFromAddContactPopUp() {
    return /*HTML*/ `
      <div class="popupContent">
          ${createPopupContentTitleFromAddContactPopUp()}
          ${createPopupContentDetailsFromAddContactPopUp()}
      </div>
    `;
  }
  
  /**
   * Creates the title section for the add contact popup.
   * 
   * @returns {string} The HTML string for the popup title.
   */
  function createPopupContentTitleFromAddContactPopUp() {
    return /*HTML*/ `
      <div class="popupContentAddContactTitle" onclick="event.stopPropagation()"> 
          <div class="popupCloseAddContactMobile">
              <img class="closeAddContactPopUpMobile" onclick="closeAddContactPopUp()" src="../assets/img/close.svg" alt="CloseAddContactPopUp">
          </div>
          <div class="logoAddContactPopUpDesktop">
              <img src="../assets/img/logoBright.svg" alt="Join Logo">
          </div>   
          <h1>Add contact</h1>
          <p>Tasks are better with a team!</p>
          <div class="SeperatorLineContentPopUp"></div>
      </div>
    `;
  }
  
  /**
   * Creates the details section for the add contact popup.
   * 
   * @returns {string} The HTML string for the popup details.
   */
  function createPopupContentDetailsFromAddContactPopUp() {
    return /*HTML*/ `
      <div class="popupContentAddContactDetails" onclick="event.stopPropagation()">
          ${createShortNameContainerFromAddContactPopUp()}
          ${createFormFromAddContactPopUp()}
      </div>
    `;
  }
  
  /**
   * Creates the short name container for the add contact popup.
   * 
   * @returns {string} The HTML string for the short name container.
   */
  function createShortNameContainerFromAddContactPopUp() {
    return /*HTML*/ `
      <div class="ShortNameContainer">
          <div class="CreateContactShortName">
              <img class="AddContactPerson" src="../assets/img/person_white.svg" alt="AddContactPerson">
          </div>
      </div>
    `;
  }
  
  /**
   * Creates the form content for the add contact popup.
   * 
   * @returns {string} The HTML string for the form content.
   */
  function createFormFromAddContactPopUp() {
    return /*HTML*/ `
      <div class="DialogAddEdit">
          <div class="popupCloseAddContactDesktop">
              <img class="closeAddContactPopUpDesktop" onclick="closeAddContactPopUp()" src="../assets/img/close_black.svg" alt="CloseAddContactPopUp">
          </div>
  
          <form class="DialogAddEditForm" onsubmit="createContact(event)">
              ${createInputContainerFromAddContactPopUp('fullName', 'text', 'Name')}
              ${createInputContainerFromAddContactPopUp('mail', 'email', 'Email')}
              ${createInputContainerFromAddContactPopUp('telNumber', 'tel', 'Phone')}
  
              <div class="ContactButtonContainer">
                  <button type="button" class="CancelContactButton" onclick="closeAddContactPopUp()">Cancel<img src="../assets/img/close_black.svg" alt="CloseAddContactPopUp"></button>
                  <button type="submit" class="CreateContactButton">Create contact<img src="../assets/img/check.svg" alt="Check"></button>
              </div>
          </form>
      </div>
    `;
  }
  
  /**
   * Creates an input container for the add contact popup form.
   * 
   * @param {string} id - The id of the input element.
   * @param {string} type - The type of the input element.
   * @param {string} placeholder - The placeholder text for the input element.
   * @returns {string} The HTML string for the input container.
   */
  function createInputContainerFromAddContactPopUp(id, type, placeholder) {
    return /*HTML*/ `
      <div class="inputContainer">
          <label for="${id}"></label>
          <input class="CreateContactInput" type="${type}" id="${id}" placeholder="${placeholder}" required>
      </div>
    `;
  }
  
  /**
   * Opens the add contact popup.
   */
  function openAddContactPopUp() {
    const popupContainer = createPopupContainerFromAddContactPopUp();
    popupContainer.innerHTML = createPopupAnimationBackgroundFromAddContactPopUp();
    document.body.appendChild(popupContainer);
  
    setTimeout(() => {
      popupContainer.classList.add("show");
    }, 10);
  }
  
  /**
   * Closes the add contact popup.
   */
  function closeAddContactPopUp() {
    const popup = document.getElementById("addContactPopup");
    if (popup) {
      popup.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 500);
    }
  }
  
  /**
   * Creates a new contact and handles form submission.
   * 
   * @param {Event} event - The form submission event.
   * @async
   * @returns {Promise<void>}
   */
  async function createContact(event) {
    event.preventDefault();
    try {
      await pushContacts();
      renderContacts();
      closeAddContactPopUp();
      renderContacts();
      window.location.href = "contacts.html";
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  }
  
  /**
   * Gets the initials from a given name.
   * 
   * @param {string} name - The full name of the contact.
   * @returns {string} The initials of the contact.
   */
  function getInitials(name) {
    let words = name.trim().split(/\s+/);
  
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
  
    let initials =
      words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    return initials;
  }
  
  /**
   * Chooses a random color from an array of colors.
   * 
   * @param {string[]} colors - An array of color strings.
   * @returns {string} A random color from the array.
   */
  function randomColor(colors) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  
  /**
   * Highlights the newly added user in the contact list.
   */
  function chooseAddedUser() {
    userId = sessionStorage.getItem("userId");
    if (userId) {
      document.getElementById(`UserId${userId}`).classList.add("selected");
      if (window.innerWidth > 1000) {
        toggleContactView(userId);
      }
      document
        .getElementById(`UserId${userId}`)
        .scrollIntoView({ behavior: "smooth", block: "start" });
      userId = "";
      sessionStorage.setItem("userId", userId);
      showAddedMessage();
    }
  }
  
  /**
   * Displays a message indicating a user was added.
   */
  function showAddedMessage() {
    const mobileElement = document.getElementById('userAddedTextMobile');
    const desktopElement = document.getElementById('userAddedTextDesktop');
  
    if (window.innerWidth <= 1000) {
      mobileElement.classList.add('userAddedTextAfterMobile');
      setTimeout(() => {
        mobileElement.classList.remove('userAddedTextAfterMobile');
      }, 2100);
    } else {
      desktopElement.classList.add('userAddedTextAfterDesktop');
      setTimeout(() => {
        desktopElement.classList.remove('userAddedTextAfterDesktop');
      }, 2100);
    }
  }
  
  function removeIdFromAssignedTo(idToRemove) {
    tasks.forEach(task => {
        task.assignedTo = task.assignedTo.filter(id => id !== idToRemove);
    });
  }