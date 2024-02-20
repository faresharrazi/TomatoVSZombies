console.log("Welcome to Jumping Game");

// MOVING THE CHARACTER

let player = document.querySelector("#tomato");
let i = 0;
let moveUrl = '';

function moveChar() {
    moveUrl = `images/character/move${nextMove()}.png`
    player.src = moveUrl;
}

function nextMove() {
    if (i >= 2) {
        i=1
    } 
    else {
        i++;
    }
    return i;
}

// MOVING THE SKY
let gameFrame = document.querySelector(".game-frame");

function createSkyItem() {
    let skyItem = document.createElement("div");
    skyItem.classList.add("sky");
    let skyImage = document.createElement("img");
    skyImage.src = "images/decoration/skyitem" + Math.floor(Math.random() * 2 + 1) + ".png"; // Randomly select skyitem1 or skyitem2
    skyItem.style.marginTop = Math.floor(Math.random() * 100) + "px";
    skyItem.appendChild(skyImage);
    gameFrame.insertBefore(skyItem, gameFrame.firstChild);
}

function moveSky () {
    let skyItems = document.querySelectorAll(".sky");
    skyItems.forEach(function(skyItem) {
    let currentLeft = parseFloat(window.getComputedStyle(skyItem).left);
   
     if (currentLeft > 0) {
        skyItem.style.left = (currentLeft - 0.9) + 'px';
    } else {
        gameFrame.removeChild(skyItem);
    }
        });

        if (Math.random() < 0.01) { 
        createSkyItem();
    }
}

// MOVING THE GRASS
let bottom = document.querySelector(".bottom");

function createGrassItem() {
    let grassItem = document.createElement("div");
    grassItem.classList.add("grass");
    let grassImage = document.createElement("img");
    grassImage.src = "images/decoration/grass" + Math.floor(Math.random() * 2 + 1) + ".png";
    grassItem.appendChild(grassImage);
    bottom.insertBefore(grassItem, bottom.firstChild);

}


function moveGrass () {
    let grassItems = document.querySelectorAll(".grass");
    grassItems.forEach(function(grassItem) {
    let currentLeft = parseFloat(window.getComputedStyle(grassItem).left);
    
     if (currentLeft > 0) {
        grassItem.style.left = (currentLeft - 0.5) + 'px';
    } else {
        bottom.removeChild(grassItem);
    }
        });

        if (Math.random() < 0.01) { 
        createGrassItem();
    }
}


// MOVING THE TREES

function createTreeItem() {
    let treeItem = document.createElement("div");
    treeItem.classList.add("tree");
    let treeImage = document.createElement("img");
    let treeType = Math.floor(Math.random() * 3) + 1;
    treeImage.src = `images/decoration/tree${treeType}.png`;
    treeItem.appendChild(treeImage);
    bottom.appendChild(treeItem); // Append to .bottom
}

function moveTree() {
    let treeItems = document.querySelectorAll(".tree");
    treeItems.forEach(function(treeItem) {
        let currentLeft = parseFloat(window.getComputedStyle(treeItem).left);
       
        if (currentLeft > 0) {
            treeItem.style.left = (currentLeft - 0.9) + 'px'; // Adjust speed as needed
        } else {
            bottom.removeChild(treeItem);
        }
    });

    if (Math.random() < 0.01) { 
        createTreeItem();
    }
}

// MOVING THE ZOMBIES (OBSTACLES)

function createZombieItem() {
    let zombieItem = document.createElement("div");
    zombieItem.classList.add("obstacles");
    let zombieImage = document.createElement("img");
    let zombieType = Math.floor(Math.random() * 3) + 1; 
    zombieImage.src = `images/obstacles/zombies/zombie${zombieType}.png`;
    zombieItem.appendChild(zombieImage);
    bottom.appendChild(zombieItem);
}

function moveZombie() {
    let zombieItems = document.querySelectorAll(".obstacles");
    zombieItems.forEach(function(zombieItem) {
        let currentLeft = parseFloat(window.getComputedStyle(zombieItem).left);
        if (currentLeft > 0) {
            zombieItem.style.left = (currentLeft - 5) + 'px'; // Adjust speed as needed
        } else {
            bottom.removeChild(zombieItem);
        }
    });

}

function getRandomTimeInterval(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// JUMPING CODE

// Constants for jump strength and gravity
let jumpVelocity = 20;
const GRAVITY = 0.5;


// Variables to track player's vertical position and velocity
let tomato = document.querySelector('.player');
let tomatoStyle = window.getComputedStyle(tomato);

const INIT_POSITION = parseInt(tomatoStyle.getPropertyValue('top'));
let CURRENT_POSITION = INIT_POSITION;

// Variable to track whether the player is currently jumping
let isJumping = false;

// Function to handle player jump
function jump() {
    if (!isJumping && gameStatus==='on') {

        document.getElementById('jumpSound').play();
        isJumping = true;
        jumpVelocity = 20;

        let jumpInterval = setInterval(function() {
        if (CURRENT_POSITION >= 65) {
            CURRENT_POSITION -= jumpVelocity;
            jumpVelocity -= GRAVITY;
            tomato.style.top = CURRENT_POSITION + 'px';
        } else {
            clearInterval(jumpInterval);
            jumpVelocity = 20;
            let fallInterval = setInterval(function() {
                if (CURRENT_POSITION < INIT_POSITION) {
                    CURRENT_POSITION += jumpVelocity;
                    jumpVelocity += GRAVITY;
                    tomato.style.top = CURRENT_POSITION + 'px';
            } else {
            clearInterval(fallInterval);
            isJumping = false;
            }
        },50);
        } 
    }, 50); 
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') { // Change 'Space' to the desired key code
        jump();
    }
});

document.addEventListener('click', jump);


// BUTTONS ACTIONS 

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const restartButton = document.getElementById('restart');

const startText = document.getElementById('textPlay');
const pauseText = document.getElementById('textPause');
const restartText = document.getElementById('textRestart');

// START BUTTON

startButton.addEventListener('click', function(event) {
    event.preventDefault();
    startButton.classList.remove('active');
    restartButton.classList.remove('active');
    pauseButton.classList.add('active');
    });

// RESTART BUTTON
restartButton.addEventListener('click', function(event) {
    event.preventDefault();
    restartButton.classList.remove('active');
    startButton.classList.remove('active');
    pauseButton.classList.add('active');
    
});

// PAUSE BUTTON
pauseButton.addEventListener('click', function(event) {
    event.preventDefault();
    pauseButton.classList.remove('active');
    startButton.classList.add('active');
    restartButton.classList.add('active');

});

// GAME LOGIC and WORKFLOW 
let gameStatus = 'off';

// Function to start the game

//SCORING
let score = 0;
let scoreInterval;
function startScore() {
    scoreInterval = setInterval(function() {
        if (gameStatus === 'on') {
            score++;
            document.getElementById('score').innerText = score;
        }
    }, 200);
}

function pauseScore() {
    clearInterval(scoreInterval);
}

function resetScore() {
    score = 0;
    document.getElementById('score').innerText = score;
}


// GAME BUTTONS IN ACTION
let moveCharInterveal, moveZombieInterval, createZombieInterval, moveTreeInterval, moveGrassInterval, moveSkyInterval;

function startGame() {
    document.querySelector('.cover').style.display = 'none';
    startScore();
    document.getElementById('gameOnSound').play();
    document.getElementById('gameIntroSound').pause();
    moveCharInterveal = setInterval(moveChar, 250);
    moveZombieInterval = setInterval(moveZombie, 25);
    createZombieInterval = setInterval(createZombieItem, 3500);
    moveTreeInterval = setInterval(moveTree, 25);
    moveGrassInterval = setInterval(moveGrass, 10);
    moveSkyInterval = setInterval(moveSky, 50);
    setTimeout(function() {
        gameStatus = 'on';
    }, 50);
}

// Function to pause the game
function pauseGame() {
    gameStatus = 'paused';
    pauseScore();
    document.getElementById('start').title = 'CONTINUE';
    document.getElementById('gameIntroSound').play();
    document.getElementById('gameOnSound').pause();
    clearInterval(moveSkyInterval);
    clearInterval(moveGrassInterval);
    clearInterval(moveTreeInterval);
    clearInterval(moveZombieInterval);
    clearInterval(createZombieInterval);
    clearInterval(moveCharInterveal);
}

// Function to restart the game
function restartGame() {
    resetScore();
    location.reload()
}


// Event listener for the start button
startButton.addEventListener('click', function(event) {
    event.preventDefault();
    startGame();
});

// Event listener for the pause button
pauseButton.addEventListener('click', function(event) {
    event.preventDefault();
    pauseGame();
});

// Event listener for the restart button
restartButton.addEventListener('click', function(event) {
    event.preventDefault();
    restartGame();
});


// COLLISION MANAGEMENT: 
// Function to detect collision between two elements
function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();
    
    return (
        rect1.right > (rect2.left)  &&
        rect1.left < (rect2.right)  &&
        rect1.bottom > (rect2.top)  
        );
}

// Function to check collision and handle game over
function checkCollisionAndGameOver() {
    const player = document.querySelector('.player img');
    const obstacles = document.querySelectorAll('.obstacles img');

    obstacles.forEach(obstacle => {
        if (isColliding(player, obstacle)) {
            // Collision detected, handle game over
            gameOver();
            return;
        }
    });
}

// Function to handle game over
function gameOver() {
    document.getElementById('gameOverSound').play();
    document.getElementById('gameOnSound').pause();
    document.getElementById('start').style.display = 'none';
    document.getElementById('pause').style.display = 'none';
    document.getElementById('restart').style.display = 'inline-block';
    document.querySelector('.gameover').style.display = 'block';
    gameStatus = 'over';
    pauseScore();
   
    clearInterval(moveSkyInterval);
    clearInterval(moveGrassInterval);
    clearInterval(moveTreeInterval);
    clearInterval(moveZombieInterval);
    clearInterval(createZombieInterval);
    clearInterval(moveCharInterveal);
    clearInterval(collisionInterval);
}

// Call checkCollisionAndGameOver periodically to check for collisions
let collisionInterval = setInterval(checkCollisionAndGameOver, 400); // Adjust the interval as needed