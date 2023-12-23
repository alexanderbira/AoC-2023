import read from "../readFile.js";
const input = await read(23);

const grid = input.split("\n").map(l => l.split(""));

const endY = grid.length - 1;
const endX = grid[0].length - 2;

const endCoord = `${endY},${endX}`;

const directions = {
  L: [0, -1],
  U: [-1, 0],
  R: [0, 1],
  D: [1, 0],
};

const adjacenciesU = {};
const adjacenciesD = {};

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {

    if (grid[y][x] === "#") continue;
    adjacenciesU[`${y},${x}`] = {};
    adjacenciesD[`${y},${x}`] = {};

    for (const direction in directions) {
      const [yMod, xMod] = directions[direction];
      const newY = y + yMod;
      const newX = x + xMod;

      if (
        newY < 0 ||
        newX < 0 ||
        newY >= grid.length ||
        newX >= grid[0].length ||
        grid[newY][newX] === "#"
      ) continue;

      adjacenciesU[`${y},${x}`][`${newY},${newX}`] = 1;

      if (grid[newY][newX] !== ".") {
        if (grid[newY][newX] === ">") {
          if (direction !== "R") continue;
        }
        if (grid[newY][newX] === "v") {
          if (direction !== "D") continue;
        }
      }

      adjacenciesD[`${y},${x}`][`${newY},${newX}`] = 1;
    }
  }
}

for (const coord in adjacenciesU) {
  const c = adjacenciesU[coord];

  if (Object.keys(c).length === 2) {
    const n1 = Object.keys(c)[0];
    const n2 = Object.keys(c)[1];

    const w = adjacenciesU[n1][coord] + adjacenciesU[n2][coord];

    delete adjacenciesU[n1][coord];
    delete adjacenciesU[n2][coord];
    adjacenciesU[n1][n2] = w;
    adjacenciesU[n2][n1] = w;

    delete adjacenciesU[coord];

    if (coord in adjacenciesD[n1] && coord in adjacenciesD[n2]) {
      delete adjacenciesD[coord];
    }
    if (coord in adjacenciesD[n1]) {
      delete adjacenciesD[n1][coord];
      adjacenciesD[n1][n2] = w;
    }
    if (coord in adjacenciesD[n2]) {
      delete adjacenciesD[n2][coord];
      adjacenciesD[n2][n1] = w;
    }

  }
}

function getLongestPath(graph, coord, visited, dist) {
  if (coord === endCoord) return dist

  let longest = 0;

  for (const neighbour in graph[coord]) {
    if (visited.has(neighbour)) continue;
    longest = Math.max(longest, getLongestPath(graph, neighbour, new Set(visited).add(neighbour), dist + graph[coord][neighbour]));
  }

  return longest;
}

let startVisited = new Set();
startVisited.add("0,1");

console.log(getLongestPath(adjacenciesD, "0,1", startVisited, 0));
// Part 2 takes ~30 seconds
console.log(getLongestPath(adjacenciesU, "0,1", startVisited, 0));
