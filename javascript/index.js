/*jshint esversion:6*/

const dish = {
  height: 400,
  width: 400, 
  isRunning: true,
  probability: 30,
  generations: 0,
  mainArr: [],
  copyArr: [],
  color: "green",
};

dish.mainArr = createDish(dish);
dish.copyArr = createDish(dish);

fillDish(dish);

playRound(dish);

// Function to create gameboard
function createDish(dish) {
  let arr = [];
  let i;
  for (i = 0; i < dish.width; i++) {
    arr[i] = [];
  }
  return arr;
}

// Function to fill initial dish
function fillDish(board) {
  let i, j;
  for (i = 0; i < dish.height; i++) {
    for (j = 0; j < dish.width; j++) {
      if (Math.random()*100 < dish.probability) {
        dish.mainArr[i][j] = 1;
      } else {
        dish.mainArr[i][j] = 0;
      }
    }
  }
}

// Parent function, holds game play "tick"
//    create & fill dish if generations = 0
//    increment generations on tick
function playRound() {
  drawDish(dish);
  updateDish(dish);
  if (dish.isRunning) {
    requestAnimationFrame(playRound);
  }
}

// Function to reset the game
//    Set generations to zero
document.getElementById("reset")
  .addEventListener("click", function() {
  let densityInput, densityValue = 30;
  densityInput = document.getElementById("probabilityInput");
  if (densityInput.value) {
    densityValue = densityInput.value;
  }

  dish.probability = densityValue;

  fillDish(dish);
  drawDish(dish);
  updateDish(dish);
});
// Function to start/Pause the game
//    Does not redraw or tick board if isRunning is false
document.getElementById("startPause")
  .addEventListener("click", function() {
    let i;
    const paused = document.getElementsByClassName("paused");
    const going = document.getElementsByClassName("going")[0];
    if (dish.isRunning) {
      dish.isRunning = false;
      this.innerHTML = '<i class="fas fa-play"></i>';
      going.style.display = "none";
      for (i = 0; i < paused.length; i++) {
          paused[i].style.display = "block";
      }
    } else {
      dish.isRunning = true;
      this.innerHTML = '<i class="fas fa-pause"></i>';
      going.style.display = "block";
     for (i = 0; i < paused.length; i++) {
          paused[i].style.display = "none";
      }
    playRound(dish);
    }
});

// Function setColor
document.getElementById("setColor")
  .addEventListener("click", function() {
    dish.color = ""+document.getElementById("colorInput").value;
    drawDish(dish);
});

document.getElementById("tickOnce")
  .addEventListener("click", function() {
    drawDish(dish);
    updateDish(dish);
  });


// Function to copy board
//    Generates copy of board
//    overwrites copy
function updateDish(dish) {
    let i, j;
  for (i = 1; i < dish.height - 1; i++) {
      for (j = 1; j < dish.width - 1; j++) {
          var totalCells = 0;
          totalCells += dish.mainArr[i - 1][j - 1]; //top left
          totalCells += dish.mainArr[i - 1][j]; //top center
          totalCells += dish.mainArr[i - 1][j + 1]; //top right

          totalCells += dish.mainArr[i][j - 1]; //middle left
          totalCells += dish.mainArr[i][j + 1]; //middle right

          totalCells += dish.mainArr[i + 1][j - 1]; //bottom left
          totalCells += dish.mainArr[i + 1][j]; //bottom center
          totalCells += dish.mainArr[i + 1][j + 1]; //bottom right

          if (dish.mainArr[i][j] === 0) {
              if (totalCells === 3) {
                dish.copyArr[i][j] = 1;
              } else {
                dish.copyArr[i][j] = 0;
              }
          } else if (dish.mainArr[i][j] === 1) { 
              if (totalCells < 2) {
                dish.copyArr[i][j] = 0;
              } else if (totalCells < 4) {
                dish.copyArr[i][j] = 1;
              } else {
                dish.copyArr[i][j] = 0;
              }
          }
      }
  }

    for (i = 0; i < dish.height; i++) {
        for (j = 0; j < dish.width; j++) {
            dish.mainArr[i][j] = dish.copyArr[i][j];
        }
    }
} 

// Function to draw the dish
function drawDish(dish) {
  let i, j;
  let c = document.getElementById("myCanvas");
  let ctx = c.getContext("2d");
  ctx.clearRect(0, 0, dish.height, dish.width);
  for ( i = 1; i < dish.height; i++) {
    for ( j = 1; j < dish.width; j++) {
      if (dish.mainArr[i][j] === 1) {
        ctx.fillStyle = `${dish.color}`;
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }
}

