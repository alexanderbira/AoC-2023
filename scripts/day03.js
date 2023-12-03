import read from "../readFile.js";
const input = await read(3);

const lines = input.split("\n");
let nums = [];
const symbols = [];

for (let y = 0; y < lines.length; y++) {

  let parsingNum = false;

  for (let x = 0; x < lines[0].length; x++) {
    const currChar = lines[y][x];

    if (currChar.match(/[0-9]/)) {

      if (parsingNum) {
        nums[0][0] += currChar;

      } else {
        nums.unshift([currChar, x, y, false]);
        parsingNum = true;

      }

      continue;
    }

    parsingNum = false;

    if (currChar !== ".") symbols.push([x, y, currChar === "*"]);
  }
}

nums = nums.map(([a, b, c]) => [Number(a), b, c]);


let sum = 0;
let ratioSum = 0;

for (const [sx, sy, isGear] of symbols) {

  const gearItems = [];

  for (const num of nums) {
    const [numValue, nxStart, ny, used] = num;

    if ([-1, 0, 1].includes(ny - sy)) {

      const nxEnd = nxStart + numValue.toString().length - 1;

      if (nxStart === sx + 1 || nxEnd === sx - 1 || (nxStart <= sx && nxEnd >= sx)) {

        if (isGear) gearItems.push(numValue);

        if (!used) {
          sum += numValue;
          num[3] = true; // the one time where object reference is useful
        }
      }

    }
  }

  if (gearItems.length === 2) ratioSum += gearItems[0] * gearItems[1];
}

console.log(sum);
console.log(ratioSum);
