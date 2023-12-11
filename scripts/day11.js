import read from "../readFile.js";
const input = await read(11);

const parsed = input.split("\n").map(l => l.split(""));

const emptyCols = [];
for (let i = 0; i < parsed[0].length; i++) {
  if (parsed.every(x => x[i] === ".")) {
    emptyCols.push(i);
  }
}

const emptyRows = [];
const galaxyCoords = [];
for (let y = 0; y < parsed.length; y++) {
  if (parsed[y].every(x => x === ".")) {
    emptyRows.push(y);
  }

  for (let x = 0; x < parsed[0].length; x++) {
    if (parsed[y][x] === "#") {
      galaxyCoords.push([y, x]);
    }
  }
}

function getDistance([p1y, p1x], [p2y, p2x], expansion) {
  const sY = Math.min(p1y, p2y);
  const eY = Math.max(p1y, p2y);

  const sX = Math.min(p1x, p2x);
  const eX = Math.max(p1x, p2x);

  const emptyRowsBetween = emptyRows.filter(y => y > sY && y < eY).length;
  const emptyColsBetween = emptyCols.filter(x => x > sX && x < eX).length;

  return (emptyRowsBetween + emptyColsBetween) * expansion + (eY - sY) + (eX - sX);
}

let sum1 = 0;
let sum2 = 0;
for (let i = 0; i < galaxyCoords.length; i++) {
  for (let j = i + 1; j < galaxyCoords.length; j++) {
    sum1 += getDistance(galaxyCoords[i], galaxyCoords[j], 1);
    sum2 += getDistance(galaxyCoords[i], galaxyCoords[j], 999999);
  }
}

console.log(sum1);
console.log(sum2);
