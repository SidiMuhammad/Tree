const gridSize = 50;
let gridX, gridY;
let gridArr = [];

let branch = [];
let tree = [];

let stemGrow;

function setup() {
    gridX = Math.floor(windowWidth/gridSize);
    gridY = Math.floor(windowHeight/gridSize);

    createCanvas(gridX*gridSize, gridY*gridSize);
    background(240);
    noLoop();
    angleMode(DEGREES);

    print(gridX, Math.floor(windowHeight/gridSize), windowHeight);

    stroke(150);
    strokeWeight(1);
    for (let x = 0; x < gridX; x++) {
        line(x*gridSize, 0, x*gridSize, height);
    }
    for (let y = 0; y < gridY; y++) {
        line(0, y*gridSize, width, y*gridSize);
    }

    for (let x = 0; x < gridX; x++) {
        gridArr.push(new Array(gridY).fill(0));
        for (let y = 0; y < gridY; y++) {
            noStroke();
            fill(150);
            textSize(10);
            text(x+' '+y, (x*gridSize)+5, (y*gridSize)+15);
        }
    }

    let seed =  new Stem(null, Math.floor(gridX/2), gridY+1, [4]);
    seed.pickType();
    branch = createBranch(seed);

    do {
        tree.push(branch);
    
        branch = createBranch(branch.at(-1));
    } while (branch.length != 0);
    
    console.log(tree);

    // stemGrow = tree.at(-1)[3];
    for (const branch of tree) {
        for (const stem of branch) {
            stemGrow = stem;
            // debugger
            do {
                stemGrow.grow();
                // redraw();
            } while (!stemGrow.finishGrow);
        }
    }
    // while (!stemGrow.finishGrow) {
    //     stemGrow.grow();
    //     redraw();
    // }
}

function draw() {
    // if (stemsDraw.length > 0) {
    //     for (const stem of stemsDraw) {
    //         if (stem.finishGrow) {
                
    //         }
    //     }
    // }
}

function createBranch(initStem) {
    let branch = [];
    let currStem = new Stem(initStem);

    for (let i = 0; i < 4;) {
        if (currStem.pickType()) {
            console.log(i, 'coba', currStem.type);
            
            if (currStem.isValid()) {
                console.log(i, 'valid', currStem.type);

                branch.push(currStem);
                changeGridState(currStem.getFilledGrid(), 1);
                currStem = new Stem(currStem);
                i++;
            }
        } else {
            console.log(i, 'mentok', currStem.type);

            branch.pop();
            currStem = currStem.prevStem;
            changeGridState(currStem.getFilledGrid(), 0);
            i--;
            
            if (currStem == initStem) {
                break;
            }
            console.log('');
        }
    }

    return branch;
}

function changeGridState(grids, state) {
    for (const grid of grids) {
        gridArr[grid[0]][grid[1]] = state;
    }
}

// function draw() {
//     if (stemDraw < branch.length && !branch[stemDraw].finishGrow) {
//         branch[stemDraw].grow();

//         if (branch[stemDraw].finishGrow) {
//             stemDraw++;
//         }
//     } else {
//         for (let x = 0; x < gridX; x++) {
//             for (let y = 0; y < gridY; y++) {
//                 if (gridArr[x][y] == 1) {
//                     push();
//                     fill(100);
//                     circle((gridSize*x)+25, (gridSize*y)+25, 20);
//                     pop();
//                 }
//             }
//         }
//         noLoop();
//     }
// }