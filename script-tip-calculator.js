if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', runCode());
} else {
    runCode();
}

function runCode(){
    const buttonCalculate = document.querySelector("button");
    buttonCalculate.addEventListener('click', calculateTip);
    function calculateTip(){
        var bill = document.getElementsByClassName("value-1")[0].value;
        var service = document.getElementsByClassName("value-2")[0];
        var numberOfPeople = document.getElementsByClassName("value-3")[0].value;
        var tip = 0;

        if(service.value == 0){
            alert("The tip is equal to " + tip);
            return;
        } else {
            if (bill < 20 || bill > 400){
                alert("Bill should be in the price range of 20$ and 400$");
                return;
            }
            if (numberOfPeople < 1 || numberOfPeople > 15){
                alert("Number of people has to be in the range of 1 and 15");
                return;
            }
            tip = Math.round((bill * service.value / numberOfPeople) + numberOfPeople);
            if ((tip > bill) || (tip === bill)){
                alert("Are you sure that the amount of people paying the bill is larger than / equal to the bill itself? Try again :)");
                return;
            } else {
                alert("Your tip is equal to " + tip + "$");
                return;
            }
        }
    }
}