import read from "../readFile.js";
const input = await read(21);

const grid = input.split("\n").map(l => l.split(""));

const yStart = grid.findIndex(l => l.includes("S"));
const xStart = grid[yStart].indexOf("S");

const sideLength = grid.length;
const stepsToEdge =  (sideLength - 1) / 2;

function quadraticApplicationWithThreePoints([x1, y1], [x2, y2], [x3, y3], x) {
  const denom = (x1 - x2) * (x1 - x3) * (x2 - x3);
  const a = -(x1 * y2 - x1 * y3 - x2 * y1 + x2 * y3 + x3 * y1 - x3 * y2) / denom;
  const b = (x1 * x1 * y2 - x1 * x1 * y3 - x2 * x2 * y1 + x2 * x2 * y3 + x3 * x3 * y1 - x3 * x3 * y2) / denom;
  const c = (x1 * x1 * x2 * y3 - x1 * x1 * x3 * y2 - x1 * x2 * x2 * y3 + x1 * x3 * x3 * y2 + x2 * x2 * x3 * y1 - x2 * x3 * x3 * y1) / denom;

  return a * x * x + b * x + c;
}

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

function getNumSpaces(grid, iterations, yStart, xStart) {

  const possibleSpaces = new Set();
  const smallestGotTo = {};

  const stack = [];
  stack.push([yStart, xStart, 0]);

  while (stack.length) {
    const [y, x, numSteps] = stack.shift();

    if (numSteps > iterations) break;
    if ((numSteps & 1) === (iterations & 1)) possibleSpaces.add(`${y},${x}`);

    if (smallestGotTo[`${x},${y}`] <= numSteps) continue;
    smallestGotTo[`${x},${y}`] = numSteps;

    for (const [yMod, xMod] of directions) {
      const newY = y + yMod;
      const newX = x + xMod;

      if (
        newY < 0 ||
        newX < 0 ||
        newY >= grid.length ||
        newX >= grid[0].length ||
        grid[newY][newX] === "#"
      ) continue;

      if (possibleSpaces.has(`${newY},${newX}`) && smallestGotTo[`${newY},${newX}`] < numSteps) continue;
      stack.push([newY, newX, numSteps + 1]);

    }
  }

  return possibleSpaces.size;
}

console.log(getNumSpaces(grid, 64, yStart, xStart));

const dupedRowStr = JSON.stringify(grid.map(row => [
  ...JSON.parse(JSON.stringify(row)),
  ...JSON.parse(JSON.stringify(row)),
  ...JSON.parse(JSON.stringify(row)),
  ...JSON.parse(JSON.stringify(row)),
  ...JSON.parse(JSON.stringify(row))
]));
const newestGrid = [
  ...JSON.parse(dupedRowStr),
  ...JSON.parse(dupedRowStr),
  ...JSON.parse(dupedRowStr),
  ...JSON.parse(dupedRowStr),
  ...JSON.parse(dupedRowStr)
];


console.log(Math.round(quadraticApplicationWithThreePoints(
  [stepsToEdge, getNumSpaces(newestGrid, stepsToEdge, yStart + 2 * sideLength, xStart + 2 * sideLength)],
  [stepsToEdge + sideLength, getNumSpaces(newestGrid, stepsToEdge + sideLength, yStart + 2 * sideLength, xStart + 2 * sideLength)],
  [stepsToEdge + sideLength * 2, getNumSpaces(newestGrid, stepsToEdge + sideLength * 2, yStart + 2 * sideLength, xStart + 2 * sideLength)],
  26501365
)));

// Does not work for the example since in the example, S is not in an empty column and row
