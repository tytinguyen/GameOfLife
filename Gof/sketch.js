function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}

let grid;
let cols;
let rows;
let resolution = 50; //Edit for size of cell

function setup() {
  createCanvas(600, 600);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

//Draw function swtich Between old 2D to New 2D and rewite old 2D
function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(255);
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
    wait(500);  //Edit for time of state change in ms
  }

  let next = make2DArray(cols, rows);

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let myCell = grid[i][j];
      // Count live neighbors!
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);
      if (myCell == 0 && neighbors == 3) {         
        next[i][j] = 1;  //a dead cell with exactly three live neighbors becomes alive in all other cases a dead cell will stay dead.
      }else if (myCell == 1 && (neighbors == 0 || neighbors == 1)) { //a live cell with zero or one live neighbors will die.
        next[i][j] = 0;
      }else if(myCell == 1 && (neighbors == 2 || neighbors == 3)){  //a live cell with two or three live neighbors will remain alive
          next[i][j] = 1;
      }else if(myCell == 1 && (neighbors >= 4)){  //a live cell with four or more live neighbors will die. 
         next[i][j] = 0;
      } else {
        next[i][j] = myCell;
      }

    }
    
  }

  grid = next;



}

// count number of neighbors for all cell 
function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}