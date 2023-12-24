import { intersect } from "mathjs";
import read from "../readFile.js";
const input = await read(24);

const stones = input
  .split("\n")
  .map(l => l
    .split(" @ ")
    .map(p => p
      .split(", ")
      .map(Number)
    )
  );

const min = 200000000000000;
const max = 400000000000000;

let numIntersections = 0;

for (let i = 0; i < stones.length - 1; i++) {
  const stone1 = stones[i];
  for (let j = i + 1; j < stones.length; j++) {
    const stone2 = stones[j];

    const intersection = intersect(
      [stone1[0][0], stone1[0][1]],
      [stone1[0][0] + stone1[1][0], stone1[0][1] + stone1[1][1]],
      [stone2[0][0], stone2[0][1]],
      [stone2[0][0] + stone2[1][0], stone2[0][1] + stone2[1][1]]
    );

    if (
      !intersection ||
      Math.sign(stone1[1][0]) !== Math.sign(intersection[0] - stone1[0][0]) ||
      Math.sign(stone1[1][1]) !== Math.sign(intersection[1] - stone1[0][1]) ||
      Math.sign(stone2[1][0]) !== Math.sign(intersection[0] - stone2[0][0]) ||
      Math.sign(stone2[1][1]) !== Math.sign(intersection[1] - stone2[0][1])
    ) continue;

    if (
      intersection[0] <= max &&
      intersection[0] >= min &&
      intersection[1] <= max &&
      intersection[1] >= min
    ) numIntersections++;

  }
}

console.log(numIntersections);

const [[x1, y1, z1], [vx1, vy1, vz1]] = stones[0];
const [[x2, y2, z2], [vx2, vy2, vz2]] = stones[1];
const [[x3, y3, z3], [vx3, vy3, vz3]] = stones[2];

console.log("Put:")
console.log("Solve[" + [
  `${x1}+${vx1}*a==x+u*a`,
  `${y1}+${vy1}*a==y+v*a`,
  `${z1}+${vz1}*a==z+w*a`,
  `${x2}+${vx2}*b==x+u*b`,
  `${y2}+${vy2}*b==y+v*b`,
  `${z2}+${vz2}*b==z+w*b`,
  `${x3}+${vx3}*c==x+u*c`,
  `${y3}+${vy3}*c==y+v*c`,
  `${z3}+${vz3}*c==z+w*c`,
].map(x => x.replace("+-", "-")).join("&&") + "]")
console.log("into a Wolfram Cloud notebook and add the x, y, and z values together to get the answer to part 2.");
// JS doesn't have any nice equation systems solvers, so I used Wolfram Alpha instead.
