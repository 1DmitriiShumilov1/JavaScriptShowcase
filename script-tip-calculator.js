if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', runCode());
} else {
    runCode();
}

function runCode(){
    const buttonCalculate = document.querySelector("button")
    buttonCalculate.addEventListener('click', calculateTip)
    function calculateTip(){
        var bill = document.getElementsByClassName("value-1")[0].value;
        var service = document.getElementsByClassName("value-2")[0];
        var numberOfPeople = document.getElementsByClassName("value-3")[0].value;
        var tip = 0;

        if(service.value == 0){
            alert("The tip is equal to " + tip);
            return;
        } else {
            tip = Math.round((bill * service.value * numberOfPeople));
            if (tip > bill){
                tip = tip / 3;
                alert("The tip is equal to " + tip);
                return;
            } else {
                alert("The tip is equal to " + tip);
                return;
            }
        }
    }
}