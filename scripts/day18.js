import read from "../readFile.js";
const input = await read(18);

const initialInstructions = input
  .split("\n")
  .map(l => l.split(" "))
  .map(i => [i[0], Number(i[1])]);
const hexInstructions = input
  .split("\n")
  .map(l => l.split(" "))
  .map(i => [
    ["R", "D", "L", "U"][i[2][7]],
    eval("0x" + i[2].slice(2, 7))
  ]);

const directions = {
  R: [0, 1],
  L: [0, -1],
  D: [1, 0],
  U: [-1, 0]
};

const leftTurn = ["UL", "RU", "DR", "LD"];

function getArea(instructions) {

  let unaccountedArea = 0;
  const vertices = [];
  let currPos = [0, 0];

  for (let i = 0; i < instructions.length; i++) {

    if (leftTurn.includes(
      instructions[i][0] +
      instructions[(i + 1) % instructions.length][0]
    )) unaccountedArea += 1 / 4;
    else unaccountedArea += 3 / 4;

    const [dirCode, distance] = instructions[i];
    unaccountedArea += (distance - 1) / 2;

    const dir = directions[dirCode];

    currPos = [
      currPos[0] + dir[0] * distance,
      currPos[1] + dir[1] * distance
    ];
    vertices.push(currPos);
  }
  vertices.push(vertices[0]);

  let area = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    area += vertices[i][1] * vertices[i + 1][0];
    area -= vertices[i][0] * vertices[i + 1][1];
  }

  return Math.abs(area) / 2 + unaccountedArea;
}

console.log(getArea(initialInstructions));
console.log(getArea(hexInstructions));
