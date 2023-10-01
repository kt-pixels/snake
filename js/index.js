// GAME CONSTANTS AND VARIABLES

let inputDir = {x:0, y:0};
const foodAudio = new Audio('food.mp3');
const overAudio = new Audio('over.wav');
let board = document.querySelector('.board');
let speed = 9;
let lastPaintTime = 0;
let score = 0;
let snakeArray = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};

// Gmae functions start from here 

function main(ctime) {
    // console.log(ctime);
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/ 1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;

    gameEngine();
}
function isCollide(snakeArr) {
    // IF SNAKE BITE YOURSELF
    for (let index = 1; index < snakeArray.length; index++) {
        if (snakeArr[index].x === snakeArr[0].x && snakeArr[index].y === snakeArr[0].y) {
            return true;
        }
    }    
    // OF YOU BUMP INTO THE WALL
    
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18 || snakeArr[0].y <= 0) {
        return true;
    }
}

function gameEngine(){
    // PART 1 UPADATING THE SNAKE ARRAY & FOOD
    if (isCollide(snakeArray)) {
        overAudio.play();
        inputDir = {x:0, y:0};
        alert(`Game over. Press any key to play again`)
        snakeArray = [{x: 13, y: 15}]
        score = 0;
    }

    // If the snake eat the food then increase the score and regenrate the food
    
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodAudio.play();
        score += 1;
        if(score > hiScorevall){
            hiScorevall = score;
            localStorage.setItem("hiscore", JSON.stringify(hiScorevall));
            hiscoreBox.innerHTML = "HiScore : " + hiScorevall;
        }
        scoreBox.innerHTML = "Score : " + score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a)* Math.random()), y: Math.round(a + (b - a)* Math.random())}
    }

    //MOVING THE SNAKE 
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i+1] = {...snakeArray[i]}
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;


    // PART 2 DISPLAY THE SNAKE AND FOOD 

    // DISPLAY SNAKE
    board.innerHTML = '';
    snakeArray.forEach((elm, index)=> {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = elm.y;
        snakeElement.style.gridColumnStart = elm.x;
        
        if (index === 0) {
        snakeElement.classList.add('head');
        }else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //DISPLAY FOOD
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}

// Mian logics start from here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiScorevall = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiScorevall));
}else {
    hiScorevall = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore : " + hiscore;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e=> {
    inputDir = {x: 0, y: -1} //Start the game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})


// NEW FINCTIONS FOR BUTTONS 

const up = document.querySelector('#up');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const down = document.querySelector('#down');

function upKey(){
up.addEventListener('click', function(){
    inputDir.x = 0;
    inputDir.y = -1;
})
};

function leftKey(){
left.addEventListener('click', function(){
    inputDir.x = -1;
    inputDir.y = 0;
})
}

function rightkey(){
right.addEventListener('click', function(){
    inputDir.x = 1;
    inputDir.y = 0;
})
}

function downKey(){
down.addEventListener('click', function(){
    inputDir.x = 0;
    inputDir.y = 1;
})
}
