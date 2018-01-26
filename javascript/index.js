/*jshint esversion:6*/

const dishHeight = 600;
const dishWidth = 600;
let dish = createDish(dishWidth);
let copyDish = createDish(dishWidth);
let isRunning = true;

fillDish();
tick();

document.getElementById("reset")
  .addEventListener("click", function() {
  let densityInput, densityValue;
  densityInput = document.getElementById("densityInput");
  if (densityInput.value) {
    densityValue = densityInput.value;
  }
  fillDish(densityValue);
  drawDish();
  updateDish();
});

document.getElementById("startPause")
  .addEventListener("click", function() {
    if (isRunning) {
      isRunning = false;
      this.innerHTML = "Start";
      document.getElementById("tickOnce").style.display = "inline-block";
    } else {
      isRunning = true;
      this.innerHTML = "Pause";
      document.getElementById("tickOnce").style.display = "none";
      tick();
    }
    return isRunning;
});

document.getElementById("tickOnce")
  .addEventListener("click", function() {
    if (!isRunning) {
      drawDish();
      updateDish();
    } else {
      this.style.display = "none";
    }
});

function tick() {
  drawDish();
  updateDish();
  if (isRunning) {
    requestAnimationFrame(tick);
  }
}

function createDish(rows) {
  let arr = [];
  let i;
  for (i = 0; i < rows; i++) {
    arr[i] = [];
  }
  return arr;
}

function fillDish(density=30) {
  let i, j;
  for (i = 0; i < dishHeight; i++) {
    for (j = 0; j < dishWidth; j++) {
      if (Math.random()*100 < density) {
        dish[i][j] = 1;
      } else {
        dish[i][j] = 0;
      }
    }
  }
}

function drawDish() {
  let i, j;
  let c = document.getElementById("myCanvas");
  let ctx = c.getContext("2d");
  ctx.clearRect(0, 0, dishWidth, dishHeight);
  for ( i = 1; i < dishHeight; i++) {
    for ( j = 1; j < dishWidth; j++) {
      if (dish[i][j] === 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }
}

function updateDish() {
  let i, j;
    for (i = 1; i < dishHeight - 1; i++) {
        for (j = 1; j < dishWidth - 1; j++) {
            var totalCells = 0;
            totalCells += dish[i - 1][j - 1]; //top left
            totalCells += dish[i - 1][j]; //top center
            totalCells += dish[i - 1][j + 1]; //top right

            totalCells += dish[i][j - 1]; //middle left
            totalCells += dish[i][j + 1]; //middle right

            totalCells += dish[i + 1][j - 1]; //bottom left
            totalCells += dish[i + 1][j]; //bottom center
            totalCells += dish[i + 1][j + 1]; //bottom right

            if (dish[i][j] === 0) {
                if (totalCells === 3) {
                  copyDish[i][j] = 1;
                } else {
                  copyDish[i][j] = 0;
                }
            } else if (dish[i][j] === 1) { 
                if (totalCells < 2) {
                  copyDish[i][j] = 0;
                } else if (totalCells < 4) {
                  copyDish[i][j] = 1;
                } else {
                  copyDish[i][j] = 0;
                }
            }
        }
    }

    for (i = 0; i < dishHeight; i++) {
        for (j = 0; j < dishWidth; j++) {
            dish[i][j] = copyDish[i][j];

        }
    }
}	
