/**
 * Created by Sunil Jain and Aiden McDonald
 * 
 * 
 * 
 * 
 * 
 * 
 */


// initially setting these flags to false. These flags indicate that the first number, operator, and second number have not been found
var firstNumBool = false;
var operatorBool = false;
var secondNumBool = false;

// these hold the values of the first num , operator, and second num that are from the buttons the user clicks
var firstNum;
var operator;
var secondNum;

// this holds the equation that is to be displayed in the work area
var current_equation = "";

// this is the final goal to be calculated at the start of each game and is referenced in the win condition
let final_goal = 0;

document.addEventListener('DOMContentLoaded', function () {
    runGame();

    const newGameButton = document.getElementById("new_game");
    newGameButton.addEventListener('click', resetGame);
});

function resetGame() {
    let blank_buttons = document.getElementsByClassName("blank");
    for (const button of blank_buttons) {
        button.classList.remove("blank");
    }

    const disabled = document.getElementsByClassName('number_button');
    for (const button of disabled){
        button.disabled = false;
        button.classList.remove("used_number");
    }

    const workarea = document.getElementById("workarea");
    for (const child of workarea.children) {
        workarea.removeChild(child);
    }

    for (const child of workarea.children) {
        workarea.removeChild(child);
    }



    reset_equation();

    runGame();
}

function runGame() {
    firstNumBool = false;
    operatorBool = false;
    secondNumBool = false;

    final_goal = 0;
    current_equation = "";
    
    //gets all button into an array
    const number_buttons = document.getElementsByClassName('number_button');

    setRandomNumbers();
    calculateGoal();

    // these hold the first and second number buttons the user clicks 
    let first;
    let second;

    // this creates the first initial h2 that is in the work area to display the equation
    append_new_display();

    // the buttons with the numbers in them have the class "number_button"
    for (const button of number_buttons) {
        button.addEventListener('click', () => {

            // if the clicked button has already been clicked, it will be marked as "used_number" this checks for that and doesnt allow the user to use it again.
            if (button.classList.contains("used_number")) {
                console.log("used num");
                get_last_display().textContent = ""; // this resets the equation that is slowly being built as the user clicks the first, second, and operator buttons
                reset_equation(); // this resets the permissions on the buttons that have been already clicked
                return;
            }
            
            
            /* the first number can only be found if: 
                1. the first number hasnt been found 
                2. the operator hasnt been found
                3. the second number hasnt been found
                */
            if (Boolean(firstNumBool) == false && Boolean(operatorBool) == false && Boolean(secondNumBool) == false) {
                firstNum = button.textContent; 
                firstNumBool = true; // we found the first number
                first = button; // keep track of the first button

                // build the equation and display it to the user as they click buttons
                get_last_display().textContent += " " + firstNum;

                button.classList.add("used_number"); //to prevent the user from reusing

            /* the second number can only be found if: 
                1. the first number has been found
                2. the operator has been found
                3. the second number hasnt been found
                */
            } else if (Boolean(firstNumBool) == true && Boolean(operatorBool) == true && Boolean(secondNumBool) == false) {
                secondNum = button.textContent;
                secondNumBool = true; // we found the second button
                second = button; // keep track of the second button

                // build the equation and display it to the user as they click buttons
                get_last_display().textContent += " " + secondNum;

                // since all equation components have been found, we need to calculate and display it!
                display_equation(first, second);


            }
        });
    }

    // the buttons with the operators in them have the class "number_button"
    const operation_buttons = document.getElementsByClassName('operation_button');
    for (const button of operation_buttons) {
        button.addEventListener('click', () => {
            // if the operation has already been clicked do not allow the user to append it to the equation
            if (button.classList.contains("used_operator")) {
                return;
            }

            // if the first number has been found, we can get the second equation component, the operator!
            if (Boolean(firstNumBool) == true) {
                operator = button.textContent;
                operatorBool = true; // we found an operator!

                // build the equation and display it to the user as they click buttons
                get_last_display().textContent += " " + operator; 
            }
        });
    }
}

function display_equation(first, second) {

    // reset all permissions on the buttons except the "disable" property (that will be reset in the new_game() function) 
    reset_equation();

    // piece together the equation as a whole
    current_equation = firstNum + " " + operator + " " + secondNum;

    // evaluate that equation
    let result = eval(current_equation);

    // check if the result is equal to the final goal we randomly set
    if (parseInt(result) === parseInt(final_goal)) { // win condition

        // add 1 to the wins display
        wins_display = document.getElementById("wins_display")

        // get the last character of the textcontent (the actual wins)
        current_wins = parseInt(wins_display.textContent.charAt(wins_display.textContent.length - 1));
        

        if (isNaN(current_wins)) { // check if we can parseInt() correctly 
            current_wins = 0; // make sure we are dealing with an integer
        }

        // increment
        current_wins++;

        // display the incremented text content
        wins_display.textContent = "Wins: " + current_wins;

    }

    // append the result to the equation
    current_equation += " " + "=" + " " + result;

    // make the first number button blank and disabled
    first.textContent = "";
    first.disabled = true;
    first.classList.add("blank");

    // store the result in the second number button 
    second.textContent = result;

    // get all the buttons that are blank
    let blank_buttons = document.getElementsByClassName("blank");

    // since we are playing with 4 total numbers, if 3 of those are used up and blank, the player cannot make any more operations
    // in this case they lose!
    if (blank_buttons.length == 3) { // lose condition

        // add one to the end 
        lose_display = document.getElementById("lose_display")

        // get the last character of the textcontent (the actual losses)
        current_losses = parseInt(lose_display.textContent.charAt(lose_display.textContent.length - 1));

        if (isNaN(current_losses)) { // check if we can parseInt() correctly 
            current_losses = 0; // make sure we are dealing with an integer
        }

        // increment
        current_losses++;

        // display the incremented text content
        lose_display.textContent = "Losses: " + current_losses;
    }

    // get the last display element in the work area and set it to the complete equation created by the user
    const display_elem = get_last_display();
    display_elem.textContent = current_equation;

    // add another display below that for the next equation
    append_new_display();

}

// appends a new h2 to the work area for the next display
function append_new_display() {
    const newH2 = document.createElement('h2');
    const workarea = document.getElementById('workarea');
    workarea.appendChild(newH2);
}

// gets the last h2 in the work area
function get_last_display() {
    return document.getElementById('workarea').lastChild;
}

// resets the equation and button "used" permission
function reset_equation() {

    // resets the numbers that have been used already
    let used_buttons = document.getElementsByClassName("used_number");
    for (const button of used_buttons) {
        button.classList.remove("used_number");
    }

    // resets the operators that have been used already
    let used_operators = document.getElementsByClassName("used_operator");
    for (const button of used_operators) {
        button.classList.remove("used_operator");
    }

    // resets what has been found
    firstNumBool = false;
    operatorBool = false;
    secondNumBool = false;
}



//gets a random int between 0 and max
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//function to set all numberButtons to a random integer
function setRandomNumbers() {
    //gets all buttons into an array
    const number_buttons = document.getElementsByClassName('number_button');

    //for all the buttons
    for (const button of number_buttons) {
        button.textContent = getRandomInt(10) + 1; //random num between 1 and 10
    }

}

function calculateGoal() {
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

    //runs a random operation on the numbers
    if (operation == 0) {
        goal.textContent = num1 + num2;
        final_goal = num1 + num2; // setting the final goal
        console.log("+");
    } else if (operation == 1) {
        goal.textContent = num1 - num2;
        final_goal = num1 - num2; // setting the final goal
        console.log("-");
    } else if (operation == 2) {
        goal.textContent = num1 * num2;
        final_goal = num1 * num2; // setting the final goal
        console.log("*");
    }

    console.log("final goal: " + final_goal);

}