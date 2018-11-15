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
let generation = 0;
let delay = true;
let resolution = 10; //Edit for size of cell

function setup() {
  createCanvas(700, 700);

  buttonStart = createButton('Start');
  buttonStart.mousePressed(loop);

  buttonStop = createButton('Stop');
  buttonStop.mousePressed(noLoop);

    // buttonResume = createButton('Resume');
    // buttonResume.mousePressed(loop);

  buttonReset = createButton('Reset');
    buttonReset.mousePressed(resetSketch);

  buttonOneGeneration = createButton('+1 Generation');
    buttonOneGeneration.mousePressed(redraw);

  button23Generation = createButton('+23 Generations');
    button23Generation.mousePressed(iterateGen);

    buttonStillLife = createButton('Still Life');
    buttonStillLife.mousePressed(stillLifeSketch);

    buttonOscillators = createButton('Oscillators');
    buttonOscillators.mousePressed(Oscillators);


    resetSketch();
    //stillLifeSketch();
    //Oscillators();

  // cols = width / resolution;
  // rows = height / resolution;

  // grid = make2DArray(cols, rows);
  // for (let i = 0; i < cols; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     grid[i][j] = floor(random(2));
  //   }
  // }
}
function resetSketch(){

  loop();
    generation = 0;
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
    noLoop();
}
function stillLifeSketch(){
  generation = 0;
  loop();
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }

    grid[20][21] = 1;
    grid[20][22] = 1;
    grid[21][21] = 1;
    grid[21][22] = 1;

    noLoop();

}

function Oscillators(){

  loop();
    generation = 0;
    cols = width / resolution;
    rows = height / resolution;

    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }

    grid[40][40] = 1;
    grid[41][40] = 1;
    grid[42][40] = 1;

    grid[10][10] = 1;
    grid[11][10] = 1;
    grid[12][10] = 1;
    grid[9][9] = 1;
    grid[10][9] = 1;
    grid[11][9] = 1;

    noLoop();
}

//Draw function swtich Between old 2D to New 2D and rewite old 2D
function draw() {
  // print("test 1");

    if(delay == true) {
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
          wait(1);  //Edit for time of state change in ms
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
              } else if (myCell == 1 && (neighbors == 0 || neighbors == 1)) { //a live cell with zero or one live neighbors will die.
                  next[i][j] = 0;
              } else if (myCell == 1 && (neighbors == 2 || neighbors == 3)) {  //a live cell with two or three live neighbors will remain alive
                  next[i][j] = 1;
              } else if (myCell == 1 && (neighbors >= 4)) {  //a live cell with four or more live neighbors will die.
                  next[i][j] = 0;
              } else {
                  next[i][j] = myCell;
              }

          }
          // print("this is " + generation + "generation");


      }
        document.getElementById("demo").innerHTML = "this is the " + generation + "th generation";
        generation++;

      grid = next;
  }
}
function pauseGame() {
    delay = false;
}
function startGame() {
    delay = true;
}
function iterateGen(){
  for(let i = 0; i < 23; i++){
    redraw();
  }
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