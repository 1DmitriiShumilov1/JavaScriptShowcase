if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', runCode());
} else {
    runCode();
}

function runCode(){

    const contacts = [];

    const addContactButton = document.getElementsByClassName("add-contact")[0];
    const updateContactButton = document.getElementsByClassName("update-contact")[0];
    const removeContactButton = document.getElementsByClassName("remove-contact")[0];

    const addContactButton_done = document.getElementsByClassName("add-done")[0];
    
    const cancelButton = document.getElementsByClassName("cancel")[0];
    const cancelButton_update = document.getElementsByClassName("cancel-update")[0];
    const cancelButton_remove = document.getElementsByClassName("cancel-remove")[0];

    const invisibleObjectAdd = document.getElementsByClassName("invisible-add")[0];
    const invisibleObjectUpdate = document.getElementsByClassName("invisible-update")[0];
    const invisibleObjectRemove = document.getElementsByClassName("invisible-remove")[0];

    const editCells = document.getElementsByClassName("edit-cell");

    //---------------------------------------------------------------------//
    addContactButton.addEventListener('click', () => {
        invisibleObjectAdd.classList.add("add-contact-form");
        cancelButton.addEventListener('click', closeWindow);
    });

    updateContactButton.addEventListener('click', () => {
        document.getElementsByClassName("update-input-name")[0].value = "";
        document.getElementsByClassName("update-input-phone")[0].value = "";

        invisibleObjectUpdate.classList.add("update-form-1");
        cancelButton_update.addEventListener('click', closeWindowUpdate, {once: true});
            for (let i = 0; i < editCells.length; i++){
                editCells[i].classList.add("hover-cell");
                editCells[i].addEventListener('click', runFunction, {once: true});
            }
    });

    removeContactButton.addEventListener('click', () => {
        invisibleObjectRemove.classList.add("remove-form");
        cancelButton_remove.addEventListener('click', closeWindowRemove, {once: true});
        let nameCells = document.getElementsByClassName("name-cell");

        for (let i = 0; i < nameCells.length; i++){
            nameCells[i].classList.add("hover-cell");
            nameCells[i].addEventListener('click', deleteContact, {once: true});
        }
    });
    //---------------------------------------------------------------------//

    function runFunction(event){
        for (let i = 0; i < editCells.length; i++){
            editCells[i].classList.remove("hover-cell");
            editCells[i].removeEventListener('click', runFunction, {once: true});
        }
        let target = event.target;
        updateInfo(target);
        return;
    }

    addContactButton_done.addEventListener('click', addContact);

    function addContact(){
        let inputName = document.getElementsByClassName("input-name")[0].value;
        let inputPhone = document.getElementsByClassName("input-phone")[0].value;
        let inputCity = document.getElementsByClassName("input-city")[0].value;

        if (inputPhone.length < 10){
            alert("Phone number should contain 10 digits");
            return;
        }

        if (/[^a-z]/i.test(inputName) || /[^a-z]/i.test(inputCity)) {
            alert("Please use only letters for name and city");
            return;
        }

        if(inputName == "" || inputCity == ""){
            alert("Please fill up all the fields");
            return;
        }

        let duplicateNumber = false;
        
        for (i = 0; i < contacts.length; i++){
            if (contacts[i].phoneNumber == inputPhone){
                duplicateNumber = true;
            }
        }

        switch(duplicateNumber){
            default:
                alert("This number is already in the list");
                break;

            case false:
                let parent = document.getElementsByClassName("contact-list")[0];
                let newName = document.createElement('span');
                let newPhone = document.createElement('span');
                let newCity = document.createElement('span');

                newName.classList.add("cell", "edit-cell", "name-cell");
                newPhone.classList.add("cell", "edit-cell");
                newCity.classList.add("cell", "edit-cell");

                newName.innerHTML = inputName;
                newPhone.innerHTML = inputPhone;
                newCity.innerHTML = inputCity;

                parent.appendChild(newName);
                parent.appendChild(newPhone);
                parent.appendChild(newCity);

                contacts.push({"name": inputName, "phoneNumber": inputPhone, "city": inputCity});

                closeWindow();
                break;
            }
    }
    
    //---------------------------------------------------------------------//

    function updateInfoFinish(a, b) {
        b.classList.remove("update-text-visible");
        a.innerHTML = "Click on the item you want to update";
        cancelButton_update.classList.remove("invisible-update");
        invisibleObjectUpdate.classList.remove("update-form-1");
    }

    function updatePhoneFinish (a, b) {
        b.classList.remove("update-phone-visible");
        a.innerHTML = "Click on the item you want to update";
        cancelButton_update.classList.remove("invisible-update");
        invisibleObjectUpdate.classList.remove("update-form-1");
        for (let i = 0; i < editCells.length; i++){
            editCells[i].classList.remove("hover-cell");
        }
    }

    function updateContacts(a, b){
        for (let i = 0; i < contacts.length; i++){
            if (contacts[i].name === a){
                contacts[i].name = b;
                return;
            }
            if (contacts[i].phoneNumber === a){
                contacts[i].phoneNumber = b;
                return;
            }
            if (contacts[i].city === a){
                contacts[i].city = b;
                return;
            }
        }
    }

    function updateInfo(target){
        let header = document.getElementsByClassName("text-update")[0];
        let newInfo = document.getElementsByClassName("update-text")[0];
        let newPhone = document.getElementsByClassName("update-phone")[0];
        let buttonReadyToUpdate = document.getElementsByClassName("update-done")[0];

        cancelButton_update.classList.add("invisible-update");

        target.classList.add("input-cell");

        if (isNaN(target.innerHTML)){
            header.innerHTML = "Enter the new info";
            newInfo.classList.add("update-text-visible");

            buttonReadyToUpdate.addEventListener('click', () => {
                realTarget = document.getElementsByClassName("input-cell")[0];
                newNameOrCityInput = document.getElementsByClassName("update-input-name")[0];

                if (newNameOrCityInput.value.length != 0){
                    if (/[^a-z]/i.test(newNameOrCityInput.value)) {
                        alert("Please use only letters for name and city");
                        realTarget.classList.remove("input-cell");
                        updateInfoFinish(header, newInfo);
                        return;
                    } else {
                        updateContacts(realTarget.innerText, newNameOrCityInput.value);
                        realTarget.innerText = newNameOrCityInput.value;
                        realTarget.classList.remove("input-cell");
                        updateInfoFinish(header, newInfo);
                        return;
                    }
                } else {
                    realTarget.classList.remove("input-cell");
                    updateInfoFinish(header, newInfo);
                    return;
                }
            }, {once: true});

        } else {
            header.innerHTML = "Enter the new number";
            newPhone.classList.add("update-phone-visible");

            buttonReadyToUpdate.addEventListener('click', () => {

                realTarget = document.getElementsByClassName("input-cell")[0];
                newPhoneInput = document.getElementsByClassName("update-input-phone")[0];

                if (newPhoneInput.value.length != 0){
                    if (newPhoneInput.value.length != 10){
                        alert("Phone number should contain 10 digits");
                        realTarget.classList.remove("input-cell");
                        updatePhoneFinish(header, newPhone);
                        return;
                    } else {
                        updateContacts(realTarget.innerHTML, newPhoneInput.value);
                        realTarget.innerHTML = newPhoneInput.value;
                        updateContacts(realTarget);
                        realTarget.classList.remove("input-cell");
                        updatePhoneFinish(header, newPhone);
                        return;
                    }
                } else {
                    realTarget.classList.remove("input-cell");
                    updatePhoneFinish(header, newPhone);
                    return;
                }

            }, {once: true});

        }
        
    }

    //---------------------------------------------------------------------//

    function deleteContact(event){
        let contactNameCell = event.target;
        let nameCells = document.getElementsByClassName("name-cell");

        for (let i = 0; i < nameCells.length; i++){
            nameCells[i].classList.remove("hover-cell");
            nameCells[i].removeEventListener('click', deleteContact, {once: true});
        }

        for (let i = 0; i < contacts.length; i++){
            if (contacts[i].name == contactNameCell.innerHTML){
                contacts.splice(i, 1)
            }
        }

        for (let x = 0; x < editCells.length; x++){
            if (contactNameCell.innerHTML == editCells[x].innerText){
                let elem1 = editCells[x].nextElementSibling.nextElementSibling;
                let elem2 = editCells[x].nextElementSibling;
                let elem3 = editCells[x];

                elem1.parentNode.removeChild(elem1);
                elem2.parentNode.removeChild(elem2);
                elem3.parentNode.removeChild(elem3);

                closeWindowRemove();
                return;
            }
        }
    }

    function closeWindow(){
        invisibleObjectAdd.classList.remove("add-contact-form");
    }

    function closeWindowUpdate(){
        invisibleObjectUpdate.classList.remove("update-form-1");
        for (let i = 0; i < editCells.length; i++){
            editCells[i].classList.remove("hover-cell");
            editCells[i].removeEventListener('click', runFunction, {once: true});
        }
    }

    function closeWindowRemove(){
        invisibleObjectRemove.classList.remove("remove-form");
        for (let i = 0; i < editCells.length; i++){
            editCells[i].classList.remove("hover-cell");
            editCells[i].removeEventListener('click', deleteContact, {once: true});
        }
    }
}

    /*const contacts = [
    {
        "name": "Jordan", 
        "phoneNumber": "9999991234", 
        "city": "Los Angeles"
    },
    {
        "name": "Alex", 
        "phoneNumber": "1234567890", 
        "city": "San Francisco"
    }, 
    {
        "name": "Sarah", 
        "phoneNumber": "9876543210", 
        "city": "Auburn"
    }
    ];*/