import read from "../readFile.js";
const input = await read(13);

const patterns = input.split("\n\n");

// author of transpose function: https://stackoverflow.com/a/46805290
function transpose(matrix) {
  const rows = matrix.length, cols = matrix[0].length;
  const grid = [];
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j];
    }
  }
  return grid;
}

function getLine(pattern, accountingSmudge) {
  outer: for (let numAbove = 1; numAbove < pattern.length; numAbove++) {
    let numSmudges = 0;

    for (let i = 1; i <= Math.min(numAbove, pattern.length - numAbove); i++) {
      if (!accountingSmudge) {
        if (pattern[numAbove - i] !== pattern[numAbove + i - 1]) {
          continue outer;
        }
      } else {
        numSmudges += pattern[numAbove - i].split("").filter((e, j) => pattern[numAbove + i - 1][j] !== e).length;
        if (numSmudges > 1) continue outer;
      }
    }

    if (accountingSmudge) {
      if (numSmudges === 1) {
        return numAbove;
      } else {
        continue;
      }
    }

    return numAbove;
  }

  return 0;
}

let sum1 = 0;
let sum2 = 0;

for (const pattern of patterns) {
  const rows = pattern.split("\n");
  const columns = transpose(rows.map(r => r.split(""))).map(c => c.join(""));

  sum1 += getLine(rows, false) * 100;
  sum2 += getLine(rows, true) * 100;
  sum1 += getLine(columns, false);
  sum2 += getLine(columns, true);
}

console.log(sum1);
console.log(sum2);
