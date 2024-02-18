console.log("Welcome to Jumping Game");

// MOVING THE CHARACTER

let player = document.querySelector("#tomato");
let i = 0;
let moveUrl = '';

let moveCharInterveal = setInterval(function (){
  moveChar()
}, 250);

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
    skyItem.style.marginTop = Math.floor(Math.random() * 151) + "px";
    skyItem.appendChild(skyImage);
    gameFrame.insertBefore(skyItem, gameFrame.firstChild);
}


let moveSkyInterval = setInterval(moveSky, 50);

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


let moveGrassInterval = setInterval(moveGrass, 10);

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

let moveTreeInterval = setInterval(moveTree, 25);

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

let moveZombieInterval = setInterval(moveZombie, 70);
let createZombieInterval = setInterval(createZombieItem, 3500);
function moveZombie() {
    let zombieItems = document.querySelectorAll(".obstacles");
    zombieItems.forEach(function(zombieItem) {
        let currentLeft = parseFloat(window.getComputedStyle(zombieItem).left);
        console.log(currentLeft)
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

  // Hover event for start button
    startButton.addEventListener('mouseover', function(event) {
        event.preventDefault();
        startText.classList.add('show');
    });
    
    startButton.addEventListener('mouseout', function(event) {
        event.preventDefault();
        startText.classList.remove('show');
    });

// RESTART BUTTON
restartButton.addEventListener('click', function(event) {
    event.preventDefault();
    restartButton.classList.remove('active');
    startButton.classList.remove('active');
    pauseButton.classList.add('active');
    
});

// Hover event for restart button
    restartButton.addEventListener('mouseover', function(event) {
        event.preventDefault();
        restartText.classList.add('show');
    });
    
    restartButton.addEventListener('mouseout', function(event) {
        event.preventDefault();
        restartText.classList.remove('show');
    });

// PAUSE BUTTON
pauseButton.addEventListener('click', function(event) {
    event.preventDefault();
    pauseButton.classList.remove('active');
    startButton.classList.add('active');
    restartButton.classList.add('active');

});

// Hover event for pause button
    pauseButton.addEventListener('mouseover', function(event) {
        event.preventDefault();
        pauseText.classList.add('show');
    });
    
    pauseButton.addEventListener('mouseout', function(event) {
        event.preventDefault();
        pauseText.classList.remove('show');
    });
