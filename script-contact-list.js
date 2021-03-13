const newContacts = [];
const addContactButton = document.getElementsByClassName("add-contact")[0];
const updateContactButton = document.getElementsByClassName("update-contact")[0];
const removeContactButton = document.getElementsByClassName("remove-contact")[0];

const inputName = document.getElementsByClassName("input-name");
const inputPhone = document.getElementsByClassName("input-phone");
const inputCity = document.getElementsByClassName("input-city");
let invisibleObject = document.getElementsByClassName("invisible")[0];

addContactButton.addEventListener('click', function () {
    invisibleObject.classList.add("add-contact-form");
});

