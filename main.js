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
    const number_buttons = document.getElementsByClassName('number_button');

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