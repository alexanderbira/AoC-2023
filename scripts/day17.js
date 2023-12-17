import { PriorityQueue } from '@datastructures-js/priority-queue';
import read from "../readFile.js";
const input = await read(17);

const grid = input.split("\n").map(i => i.split("").map(Number));

const start = [0, 0];
const end = [grid.length - 1, grid[0].length - 1];

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];

function leastHeatLoss(heavy) {

  const visited = new Set();
  const pq = new PriorityQueue((a, b) => a[0] - b[0]);

  pq.enqueue([0, start, null, 0]);

  while (pq.size) {

    const [distance, coords, dir, steps] = pq.pop();

    if (coords[0] === end[0] && coords[1] === end[1]) return distance;

    for (const newDir of directions) {
      const newCoords = [coords[0] + newDir[0], coords[1] + newDir[1]];

      if (
        dir && dir[0] === -newDir[0] && dir[1] === -newDir[1] ||
        newCoords[0] < 0 ||
        newCoords[1] < 0 ||
        newCoords[0] >= grid.length ||
        newCoords[1] >= grid[0].length
      ) continue;

      if (heavy) {
        if (
          dir !== newDir && dir && steps < 4 ||
          dir === newDir && steps === 10
        ) continue;

      } else if (dir === newDir && steps === 3) continue;

      let newSteps = 1;
      if (dir === newDir) newSteps += steps;

      const key = `${newCoords[0]},${newCoords[1]},${newDir[0]},${newDir[1]},${newSteps}`;

      if (visited.has(key)) continue;
      visited.add(key);

      pq.push([distance + grid[newCoords[0]][newCoords[1]], newCoords, newDir, newSteps]);
    }
  }
}

console.log(leastHeatLoss(false));
console.log(leastHeatLoss(true));
