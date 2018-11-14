function make2DArray(cols, rows){
    let arr = new Array(cols);
    //make empty 2D array
    for(let i = 0; i <arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}
let grid;
let cols = 20;
let rows = 20;
let resolution = 20;


function setup(){
    grid = make2DArray(20,20);

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            //fill each cell with a random number from 0 - 1
            grid[i][j] = Math.floor(Math.random()*2);
        }

    }
}

function draw(){
    // document.body.style.background = 'black';
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            ctx.background = 'black';
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                ctx.fillStyle= "black";
                // ctx.strokeStyle="black";
                ctx.fill();
                ctx.rect(x, y, resolution-1, resolution-1);
                // ctx.stroke();

            }
        }
    }

    let next = make2DArray(cols, rows);
    //compute next generation on grid
    for(let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let state = grid[i][j];
            //ignore edge for now
            if (i == 0 || i == cols - 1 || j == 0 || j == rows - 1) {
                next[i][j] = state;

            } else {

                //count live neighbors
                let sum = 0;
                let neighbors = countNeighbors(grid, i, j);


                //implement rulesssss
                if (state == 0 && neighbors == 3) {
                    next[i][j] = 1;
                }
                if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }

                // sum += grid[i-1][j-1];
                // sum += grid[i][j-1];
                // sum += grid[i+1][j-1];
                // sum += grid[i+1][j];
                // sum += grid[i+1][j+1];
                // sum += grid[i][j+1];
                // sum += grid[i-1][j+1];
                // sum += grid[i-1][j];


            }
        }
    }
    grid = next;
    setTimeout(() => {
        requestAnimationFrame(() => draw(ctx, next))
    }, 1000/8)

}
function countNeighbors(grid, x,y){
    let sum =0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            sum += grid[x + i][y + j];
        }
    }
    //don't want to count my own cell
    sum -= grid[x][y];
    return sum;

}