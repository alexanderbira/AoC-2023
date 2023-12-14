import read from "../readFile.js";
const input = await read(14);

const grid = input.split("\n").map(l => l.split(""));
const gridSize = grid.length;

function northSupport(grid) {
  let rows = gridSize;
  let sum = 0;
  for (let row of grid) {
    sum += row.filter(i => i === "O").length * rows;
    rows--;
  }
  return sum;
}

function tilt(grid, direction) {
  for (let end = gridSize - 1; end > 0; end--) {
    let anyMovement = false;
    for (let axis1 = 0; axis1 < end; axis1++) {
      for (let axis2 = 0; axis2 < gridSize; axis2++) {

        switch (direction) {
          case "N":
            if (grid[axis1 + 1][axis2] === "O" && grid[axis1][axis2] === ".") {
              grid[axis1 + 1][axis2] = ".";
              grid[axis1][axis2] = "O";
              anyMovement = true;
            }
            break;
          case "W":
            if (grid[axis2][axis1 + 1] === "O" && grid[axis2][axis1] === ".") {
              grid[axis2][axis1 + 1] = ".";
              grid[axis2][axis1] = "O";
              anyMovement = true;
            }
            break;
          case "S":
            if (grid[axis1 + 1][axis2] === "." && grid[axis1][axis2] === "O") {
              grid[axis1 + 1][axis2] = "O";
              grid[axis1][axis2] = ".";
              anyMovement = true;
            }
            break;
          case "E":
            if (grid[axis2][axis1 + 1] === "." && grid[axis2][axis1] === "O") {
              grid[axis2][axis1 + 1] = "O";
              grid[axis2][axis1] = ".";
              anyMovement = true;
            }

        }

      }
    }
    if (!anyMovement) {
      break;
    }
  }
}

tilt(grid, "N");
console.log(northSupport(grid));

const prevsSet = new Set();
const prevsList = [];

for (let i = 0; i < 1_000_000_000; i++) {
  tilt(grid, "N");
  tilt(grid, "W");
  tilt(grid, "S");
  tilt(grid, "E");

  const currState = grid.map(l => l.join("")).join("\n");

  if (prevsSet.has(currState)) {
    const encountered = prevsList.findIndex(x => x === currState);
    const index = encountered + ((999_999_999 - encountered) % (i - encountered));
    console.log(northSupport(prevsList[index].split("\n").map(l => l.split(""))));
    break;

  } else {
    prevsSet.add(currState);
    prevsList.push(currState);
  }
}
