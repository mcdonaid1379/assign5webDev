/* document.getElementById("b1").addEventListener("click", numberDisplay);
document.getElementById("b2").addEventListener("click", numberDisplay);
document.getElementById("b3").addEventListener("click", numberDisplay);
document.getElementById("b4").addEventListener("click", numberDisplay); */

/* 
Whenever we get to it, we need to make the goal attainable using the numbers on the board. 
 
Sunil idea: 

we have 4 numbers and 3 operations
we need a number that can be calculated using these

instead of doing math to figure out what numbers can be calculated with what:

pick two random numbers
pick a random operation

repeat a few times

and you have a goal

end Sunil idea
*/

var firstNumBool = false;
var operatorBool = false;
var secondNumBool = false;

var firstNum;
var operator;
var secondNum;

var current_equation = "";

document.addEventListener('DOMContentLoaded', function() {
    //gets all button into an array
    const number_buttons = document.getElementsByClassName('number_button');

    setRandomNumbers();
    calculateGoal();

    for (const button of number_buttons) {
        button.addEventListener('click', () => {

            console.log("oisdjfoi");
            if (button.classList.contains("used_number")) {
                console.log("used num");
                return;
            }

            if (firstNumBool == false && operator == false && secondNumBool == false) {
                firstNum = button.textContent;
                firstNumBool = true;

                console.log("first number");

                button.classList.add("used_number"); //to prevent the user from reusing
            } else if (firstNumBool == true && operator == true && secondNumBool == false) {
                secondNum = button.textContent;
                secondNumBool = true;

                firstNumBool = false;
                operatorBool = false;
                secondNumBool = false;

                console.log("second number");

                button.classList.add("used_number"); //to prevent the user from reusing

                display_equation();
            }

            
            
        });
    }

    const operation_buttons = document.getElementsByClassName('operation_button');
    for (const button of operation_buttons) {
        button.addEventListener('click', () => {
            if (button.classList.contains("used_operation")) {
                return;
            }

            if (firstNumBool == true) {
                current_equation += button.textContent;
                operator = true;
                console.log("operation");
            }
        });
    }



});

function display_equation () {
    const newH2 = document.createElement('h2');
    newH2.textContent = current_equation;
    const workarea = document.getElementById('workarea');
    workarea.appendChild(newH2);
}

//gets a random int between 0 and max
function getRandomInt (max) {
    return Math.floor(Math.random() * max) ;
}

//function to set all numberButtons to a random integer
function setRandomNumbers (){
    //gets all buttons into an array
    const number_buttons = document.getElementsByClassName('number_button');

    //for all the buttons
    for (const button of number_buttons) {
        button.textContent = getRandomInt(10) + 1; //random num between 1 and 10
    }

}

function calculateGoal (){
    console.log("calculateGoal called")

    //gets all buttons into an array
    const number_buttons = document.getElementsByClassName('number_button');
    
    //gets the goal display
    const goal = document.getElementById('goal');

    let operation = getRandomInt(3);
    console.log(operation);

    //gets two random number on the board that are not the same
    let num1 = parseInt(number_buttons[getRandomInt(4)].textContent);
    let num2 = parseInt(number_buttons[getRandomInt(4)].textContent);
    while (num1 == num2) {
        num2 = parseInt(number_buttons[getRandomInt(4)].textContent);
    } 
    
    //runds a random operation on the numbers
    if (operation == 0) {
        goal.textContent = num1 + num2;
        console.log("+");
    } else if (operation == 1){
        goal.textContent = num1 - num2;
        console.log("-");
    } else if (operation == 2){
        goal.textContent = num1 * num2;
        console.log("*");
    }

}