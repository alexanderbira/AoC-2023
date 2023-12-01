import read from "../readFile.js";
const input = await read(1);

let lines = input.split("\n");
let table = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "one": "1",
  "two": "2",
  "three": "3",
  "four": "4",
  "five": "5",
  "six": "6",
  "seven": "7",
  "eight": "8",
  "nine": "9"
}

let ans1 = lines
  .map(l => l.match(/[1-9]/g))
  .map(l => Number(table[l[0]] + table[l[l.length - 1]]))
  .reduce((a, b) => a + b, 0)
console.log(ans1)

let ans2 = lines
  .map(l => Array.from(l.matchAll(/(?=([1-9]|one|two|three|four|five|six|seven|eight|nine))/g), x => x[1]))
  .map(l => Number(table[l[0]] + table[l[l.length - 1]]))
  .reduce((a, b) => a + b, 0)
console.log(ans2)
