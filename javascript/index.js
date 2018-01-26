const dishHeight = 400;
const dishWidth = 400;
let dish = createDish(dishWidth);
let copyDish = createDish(dishWidth);

fillDish(); //create the starting state for the grid by filling it with random cells

document.getElementById("reset")
  .addEventListener("click", function() {
  let densityInput, densityValue;
  densityInput = document.getElementById("densityInput");
  if (densityInput) {
    densityValue = densityInput.value/100;
  } else {
    densityValue = 0.3;
  }
  fillDish(densityValue);
});

tick(); //call main loop

//functions 
function tick() { //main loop
  drawDish();
  updateDish();
  requestAnimationFrame(tick);
}

function createDish(rows) { //creates a 2 dimensional array of required height
  let arr = [];
  let i;
  for (i = 0; i < rows; i++) {
    arr[i] = [];
  }
  return arr;
}

function fillDish(density=0.3) { //fill the grid randomly
  let i, j;
  for (i = 0; i < dishHeight; i++) { //iterate through rows
    for (j = 0; j < dishWidth; j++) { //iterate through columns
      if (Math.random() < density) {
        dish[i][j] = 1;
      } else {
        dish[i][j] = 0;
      }
    }
  }
}

function drawDish() { //draw the contents of the grid onto a canvas
  let i, j;
  let c = document.getElementById("myCanvas");
  let ctx = c.getContext("2d");
  ctx.clearRect(0, 0, 400, 400); //this should clear the canvas ahead of each redraw
  for ( i = 1; i < dishHeight; i++) { //iterate through rows
    for ( j = 1; j < dishWidth; j++) { //iterate through columns
      if (dish[i][j] === 1) {
        ctx.fillStyle = "green";
        ctx.fillRect(i, j, 1, 1);
      }
    }
  }
}

function updateDish() { //perform one iteration of grid update
  let i, j;
    for (i = 1; i < dishHeight - 1; i++) { //iterate through rows
        for (j = 1; j < dishWidth - 1; j++) { //iterate through columns
            var totalCells = 0;
            //add up the total values for the surrounding cells
            totalCells += dish[i - 1][j - 1]; //top left
            totalCells += dish[i - 1][j]; //top center
            totalCells += dish[i - 1][j + 1]; //top right

            totalCells += dish[i][j - 1]; //middle left
            totalCells += dish[i][j + 1]; //middle right

            totalCells += dish[i + 1][j - 1]; //bottom left
            totalCells += dish[i + 1][j]; //bottom center
            totalCells += dish[i + 1][j + 1]; //bottom right


            //apply the rules to each cell
            if (dish[i][j] === 0) {
                if (totalCells === 3) {
                  copyDish[i][j] = 1;
                } else {
                  copyDish[i][j] = 0;
                }
            } else if (dish[i][j] === 1) { //apply rules to living cell
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

    for (i = 0; i < dishHeight; i++) { //iterate through rows
        for (j = 0; j < dishWidth; j++) { //iterate through columns
            dish[i][j] = copyDish[i][j];

        }
    }
}	
