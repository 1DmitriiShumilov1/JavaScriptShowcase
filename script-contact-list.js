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
    }];

    const addContactButton = document.getElementsByClassName("add-contact")[0];
    const updateContactButton = document.getElementsByClassName("update-contact")[0];
    const removeContactButton = document.getElementsByClassName("remove-contact")[0];

    const addContactButton_done = document.getElementsByClassName("add-done")[0];
    const cancelButton = document.getElementsByClassName("cancel")[0];
    let invisibleObject = document.getElementsByClassName("invisible")[0];

    addContactButton.addEventListener('click', () => {
        invisibleObject.classList.add("add-contact-form");
    });

    cancelButton.addEventListener('click', closeWindow);

    addContactButton_done.addEventListener('click', addContact);

    function addContact(){
        var inputName = document.getElementsByClassName("input-name")[0].value;
        var inputPhone = document.getElementsByClassName("input-phone")[0].value;
        var inputCity = document.getElementsByClassName("input-city")[0].value;

        if (inputPhone.length < 10){
            alert("Phone number should contain 10 digits");
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

                newName.classList.add("cell");
                newPhone.classList.add("cell");
                newCity.classList.add("cell");

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

        

    function closeWindow(){
        invisibleObject.classList.remove("add-contact-form");
    }
}