import read from "../readFile.js";
const input = await read(5);

const maps = input
  .split("\n\n")
  .map(m => m.split("\n"))
  .map((m, i) => {
    if (i > 0) {
      m.shift();
      return m;
    }
    return [m[0].split(": ")[1]];
  })
  .map(m => m.map(r => r
    .split(" ")
    .map(Number)
  ));

let currNums = maps.shift()[0];
const currNumsCopy = [...currNums];

for (const map of maps) {
  let nextNums = [];

  for (const [destRangeStart, srcRangeStart, rangeLength] of map) {
    for (let i = 0; i < currNums.length; i++) {

      if ((currNums[i] >= srcRangeStart) && (currNums[i] <= srcRangeStart + rangeLength)) {
        nextNums.push(destRangeStart + currNums[i] - srcRangeStart);
        currNums.splice(i, 1);
        i--;
      }

    }
  }

  currNums = [...currNums, ...nextNums];
}

console.log(currNums.reduce((a, b) => Math.min(a, b), currNums[0]));

// Part 2 done separately to avoid confusion
let ranges = [];
for (let i = 0; i < currNumsCopy.length / 2; i++) {
  ranges.push([currNumsCopy[2 * i], currNumsCopy[2 * i] + currNumsCopy[2 * i + 1]]);
}

for (const map of maps) {
  let newRanges = [];

  for (const [dest, src, r] of map) {

    const toAddLater = [];
    for (const [start, end] of ranges) {

      const before = [start, Math.min(end, src)];
      const between = [Math.max(start, src), Math.min(end, src + r)];
      const after = [Math.max(src + r, start), end];

      if (before[1] > before[0]) {
        toAddLater.push(before);
      }

      if (between[1] > between[0]) {
        newRanges.push([between[0] + dest - src, between[1] + dest - src]);
      }

      if (after[1] > after[0]) {
        toAddLater.push(after);
      }

    }

    ranges = toAddLater;
  }

  ranges = [...ranges, ...newRanges];

}

console.log(ranges.reduce((a, b) => Math.min(a, b[0]), currNums[0]));
