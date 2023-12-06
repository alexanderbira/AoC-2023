import read from "../readFile.js";
const input = await read(6);

const records = input
  .split("\n")
  .map(l => l
    .split(":")[1]
    .trim()
    .split(/\s+/g)
    .map(Number)
  );

const quadraticRangeSolver = (totalTime, record) => {
  const d = Math.sqrt(totalTime ** 2 - 4 * record) - 2;
  return Math.ceil((totalTime + d) / 2) - Math.floor((totalTime - d) / 2) + 1;
}


console.log(records[0].reduce((a, c, i) => a * quadraticRangeSolver(c, records[1][i]), 1));

console.log(quadraticRangeSolver(...records.map(l =>
  Number(l
    .map(n => n.toString())
    .join("")
  )
)));
