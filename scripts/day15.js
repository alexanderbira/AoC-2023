import read from "../readFile.js";
const input = await read(15);

const steps = input.split(",");

function hash(str) {
  let val = 0;
  for (const char of str) {
    val += char.charCodeAt(0);
    val *= 17;
    val %= 256;
  }
  return val;
}

let hashSum = 0;
const boxes = {};

for (const step of steps) {
  hashSum += hash(step);

  const [label, focalLength] = step.split(/[-=]/);
  const boxNum = hash(label);

  if (focalLength === "") {
    // it was -
    if (boxes[boxNum]) {
      const index = boxes[boxNum].findIndex(box => box[0] === label);
      if (index !== -1) boxes[boxNum].splice(index, 1);
    }

  } else {
    // it was =
    if (!boxes[boxNum]) boxes[boxNum] = [];
    const index = boxes[boxNum].findIndex(box => box[0] === label);
    if (index === -1) {
      boxes[boxNum].push([label, Number(focalLength)]);
    } else {
      boxes[boxNum][index][1] = Number(focalLength);
    }
  }

}

console.log(hashSum);

let focusSum = 0;
for (const box of Object.keys(boxes)) {
  for (let lens = 0; lens < boxes[box].length; lens++) {
    focusSum += (Number(box) + 1) * (lens + 1) * boxes[box][lens][1];
  }
}

console.log(focusSum);
