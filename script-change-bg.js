if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', runCode());
} else {
    runCode();
}

function runCode (){
    let button = document.getElementsByClassName("container")[0];
    console.log(button)
    
    button.addEventListener('click', changeBackgroundColor);

    function changeBackgroundColor(){
        const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        let container = document.getElementsByClassName("main-container")[0];
        let colorInfo = document.getElementsByClassName("paragraph")[0];
        let randomColor = [];
        
        for (var i = 0; i < 6; i++){
            randomColor.push( values[(Math.floor(Math.random() * (values.length)))] );
        }

        let newColor = "#" + randomColor.join("");

        container.style.backgroundColor = newColor;

        colorInfo.innerText = newColor;
        colorInfo.style.color = newColor;
    }
}