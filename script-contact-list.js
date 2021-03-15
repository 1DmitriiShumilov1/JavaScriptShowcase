if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', runCode());
} else {
    runCode();
}

function runCode(){

    const contacts = [
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
    ];

    const addContactButton = document.getElementsByClassName("add-contact")[0];
    const updateContactButton = document.getElementsByClassName("update-contact")[0];
    const removeContactButton = document.getElementsByClassName("remove-contact")[0];

    const addContactButton_done = document.getElementsByClassName("add-done")[0];
    const cancelButton = document.getElementsByClassName("cancel")[0];
    const cancelButton_update = document.getElementsByClassName("cancel-update")[0];

    const invisibleObjectAdd = document.getElementsByClassName("invisible-add")[0];
    const invisibleObjectUpdate = document.getElementsByClassName("invisible-update")[0];

    const editCells = document.getElementsByClassName("edit-cell");

    addContactButton.addEventListener('click', () => {
        invisibleObjectAdd.classList.add("add-contact-form");
    });

    updateContactButton.addEventListener('click', () => {
        document.getElementsByClassName("update-input-name")[0].value = "";
        invisibleObjectUpdate.classList.add("update-form-1");
            /*editCells[i].addEventListener('click', function (e) {
                var target = e.target;
                console.log(target);
                updateInfo(editCells, target);
                return;
            }, {once: true});*/
            for (var i = 0; i < editCells.length; i++){
                editCells[i].addEventListener('click', runFunction);
            }
    });

    function runFunction(event){
        for (var i = 0; i < editCells.length; i++){
            editCells[i].removeEventListener('click', runFunction);
        }
        var target = event.target;
        updateInfo(editCells, target);
        return;
    }

    cancelButton.addEventListener('click', closeWindow);
    cancelButton_update.addEventListener('click', closeWindowUpdate);

    addContactButton_done.addEventListener('click', addContact);

    function addContact(){
        var inputName = document.getElementsByClassName("input-name")[0].value;
        var inputPhone = document.getElementsByClassName("input-phone")[0].value;
        var inputCity = document.getElementsByClassName("input-city")[0].value;

        if (inputPhone.length < 10){
            alert("Phone number should contain 10 digits");
            return;
        }

        if (/[^a-z]/i.test(inputName) || /[^a-z]/i.test(inputCity)) {
            alert("PLease use letters for name and city");
            return;
         }

        if(inputName == "" || inputCity == ""){
            alert("Please fill up all the fields");
            return;
        }

        var duplicateNumber = false;
        
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
                var parent = document.getElementsByClassName("contact-list")[0];
                var newName = document.createElement('span');
                var newPhone = document.createElement('span');
                var newCity = document.createElement('span');

                newName.classList.add("cell", "edit-cell");
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


    function updateInfo(editCells, target){
        var newNameOrCityInput = document.getElementsByClassName("update-input-name")[0];
        var header = document.getElementsByClassName("text-update")[0];
        var newInfo = document.getElementsByClassName("update-text")[0];
        var buttonReadyToUpdate = document.getElementsByClassName("update-done")[0];

        target.classList.add("input-cell");

        header.innerHTML = "Enter the new info";
        buttonReadyToUpdate.addEventListener('click', () => {
            realTarget = document.getElementsByClassName("input-cell")[0];
            newNameOrCityInput = document.getElementsByClassName("update-input-name")[0];
            realTarget.innerText = newNameOrCityInput.value;
            closeWindowUpdateText(header, newInfo);
            realTarget.classList.remove("input-cell");
            /*newPhone.classList.remove("update-phone-visible");*/
        });
        newInfo.classList.add("update-text-visible");
        
    };

    function closeWindow(){
        invisibleObjectAdd.classList.remove("add-contact-form");
    }

    function closeWindowUpdateText(var1, var2){
        invisibleObjectUpdate.classList.remove("update-form-1");
        var1.innerHTML = "Click on the item you want to update";
        var2.classList.remove("update-text-visible");
        var2.value = "";
    }

    function closeWindowUpdatePhone(var1, var2){
        invisibleObjectUpdate.classList.remove("update-form-1");
        var1.innerHTML = "Click on the item you want to update";
        var2.classList.remove("update-phone-visible");
        var2.value = "";
    }

    function closeWindowUpdate(){
        invisibleObjectUpdate.classList.remove("update-form-1");
    }
}