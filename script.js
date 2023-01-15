let random = Math.floor((Math.random() * 6) + 1);
// you can change the name of the player ! 
let player1 = document.querySelector('#player_1_name');
let player2 = document.querySelector('#player_2_name');

let roll = document.querySelector('#roll');
let hold = document.querySelector('#hold');
let new_game = document.querySelector('#new');

let total_score_1 = document.querySelector('#player_score_1');
let current_score_1 = document.querySelector('#current_score_1');

let total_score_2 = document.querySelector('#player_score_2');
let current_score_2 = document.querySelector('#current_score_2');

// the outer div of the player ! box shadow !
let player_1 = document.querySelector('#player_1');
let player_2 = document.querySelector('#player_2');

let points = document.querySelector('#points');
let btn_points = document.querySelector('#btn-points');

let winning_result = document.querySelector('#winning_result');

let winner = document.querySelector('#winner');
player_1.classList.add('my-round');

const dice = document.querySelector('.dice');

// you can't roll while the card is rolling 
let clicked = 0;

// Player position
let player = 0;

// you can't hold the values while the card is rolling ...
let isRolling = 0;

// you can't change the ressult once you entered it! 
let isResult = 0;

function dice_pic(num) {
    removeAllElement(dice);
    random = Math.floor((Math.random() * 6) + 1);
    createimage(random);
    let temp = 0;
    // The time of card rolling is 300, change it the way you like!
    let time = setInterval(repeat, 300);

    function repeat() {
        isRolling = 1;
        random = Math.floor((Math.random() * 6) + 1);
        let img = document.querySelector('.added');
        if (temp == 6) {
            clearInterval(time);
            img.remove();
            createimage(num);
            clicked = 0;
            if (num == 1) {
                tryAgain();
                isRolling = 0;
                switchPlayers();
            } else {
                playerScores(num);
                isRolling = 0;
            }
        } else {
            img.remove();
            createimage(random);
            temp++;
        }
    }
}
function playerScores(value) {
    if (player == 0) {
        let currentVal = current_score_1.textContent;
        currentVal = Number(currentVal);
        currentVal += value;
        current_score_1.textContent = currentVal;
    } else {
        let currentVal = current_score_2.textContent;
        currentVal = Number(currentVal);
        currentVal += value;
        current_score_2.textContent = currentVal;
    }
}
function switchPlayers() {
    if (player == 0) {
        player = 1;
        player_1.classList.remove('my-round');
        player_2.classList.add('my-round');
    } else {
        player = 0;
        player_1.classList.add('my-round');
        player_2.classList.remove('my-round');
    }
}
function tryAgain() {
    if (player == 0) {
        current_score_1.textContent = 0;
    } else {
        current_score_2.textContent = 0;
    }
}
function createimage(random) {
    let img = document.createElement('img');
    img.classList.add('added');
    img.src = `${random}.png`;
    dice.append(img);
}
function removeAllElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
function checkWinner() {
    if (player == 0) {
        let value = total_score_1.textContent;
        value = Number(value);
        let winning = Number(winning_result.textContent);
        if (value >= winning) {
            winner.textContent = `Winner : ${player1.textContent}`;
        }
    } else {
        let value = total_score_2.textContent;
        value = Number(value);
        let winning = Number(winning_result.textContent);
        if (value >= winning) {
            winner.textContent = `Winner : ${player2.textContent}`;
        }
    }
}

btn_points.addEventListener('click', () => {
    if (isResult == 0) {
        if (Number(points.value)) {
            winning_result.textContent = points.value;
            points.value = "";
            isResult = 1;
        }
    }
})

roll.addEventListener('click', () => {
    random = Math.floor((Math.random() * 6) + 1);
    if (clicked == 0) {
        dice_pic(random);
        clicked++;
    }
});

hold.addEventListener('click', () => {
    if (isRolling == 0) {
        if (player == 0) {
            let value = total_score_1.textContent;
            value = Number(value);
            let currentVal = current_score_1.textContent;
            currentVal = Number(currentVal);
            currentVal += value;
            total_score_1.textContent = currentVal;
            current_score_1.textContent = 0;
        } else {
            let value = total_score_2.textContent;
            value = Number(value);
            let currentVal = current_score_2.textContent;
            currentVal = Number(currentVal);
            currentVal += value;
            total_score_2.textContent = currentVal;
            current_score_2.textContent = 0;
        }
        checkWinner();
        switchPlayers();
    }
});

new_game.addEventListener('click', () => {
    clicked = 0;
    player = 0;
    isRolling = 0;
    isResult = 0;

    player_1.classList.add('my-round');
    player_2.classList.remove('my-round');
    winning_result.textContent = 30;

    total_score_1.textContent = 0;
    current_score_1.textContent = 0;

    total_score_2.textContent = 0;
    current_score_2.textContent = 0;

    winner.textContent = "";
})