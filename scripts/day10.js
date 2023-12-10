import read from "../readFile.js";
const input = await read(10);

const rows = input.split("\n").map(x => x.split(""));

const sy = rows.findIndex(x => x.includes("S"));
const sx = rows[sy].indexOf("S");

let directions = "";
if (rows[sy - 1] && ["7", "|", "F"].includes(rows[sy - 1][sx])) directions += "U";
if (rows[sy + 1] && ["|", "L", "J"].includes(rows[sy + 1][sx])) directions += "D";
if (rows[0][sx - 1] && ["-", "L", "F"].includes(rows[sy][sx - 1])) directions += "L";
if (rows[0][sx + 1] && ["-", "J", "7"].includes(rows[sy][sx + 1])) directions += "R";
rows[sy][sx] = {
  UD: "|",
  UL: "J",
  UR: "L",
  DL: "7",
  DR: "F",
  LR: "-"
}[directions];

function getAdjacent([y, x]) {
  switch (rows[y][x]) {
    case "7":
      return [[y, x - 1], [y + 1, x]];
    case "|":
      return [[y + 1, x], [y - 1, x]];
    case "-":
      return [[y, x - 1], [y, x + 1]];
    case "L":
      return [[y - 1, x], [y, x + 1]];
    case "F":
      return [[y + 1, x], [y, x + 1]];
    case "J":
      return [[y - 1, x], [y, x - 1]];
  }
}

const walls = new Set();
let currPos = getAdjacent([sy, sx])[0];
let prevPos = [sy, sx];
let loopLen = 1;

while (currPos[0] !== sy || currPos[1] !== sx) {
  loopLen++;
  walls.add(prevPos.join(","));

  const nextPos = getAdjacent(currPos);
  const currPosCopy = [...currPos];

  currPos = [...nextPos[
    (nextPos[0][0] === prevPos[0] && nextPos[0][1] === prevPos[1]) ? 1 : 0
  ]];

  prevPos = currPosCopy;
}
walls.add(prevPos.join(","));

console.log(loopLen / 2);


let numIn = 0;

for (let y = 0; y < rows.length; y++) {
  for (let x = 0; x < rows[0].length; x++) {
    if (!walls.has([y, x].join(","))) {

      let overWall = false;
      for (let currX = x + 1; currX < rows[0].length; currX++) {
        if (["|", "L", "J"].includes(rows[y][currX]) && walls.has([y, currX].join(","))) overWall = !overWall;
      }
      if (overWall) numIn++;
      
    }
  }
}

console.log(numIn);
