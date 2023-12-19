import read from "../readFile.js";
const input = await read(19);

const sections = input.split("\n\n");

const parts = sections[1]
  .replace(/=/g, ":")
  .split("\n")
  .map(l => eval(`(${l})`));

const workflows = Object.fromEntries(
  sections[0]
    .split("\n")
    .map(l => l.split("{"))
    .map(w => [
      w[0],
      w[1]
        .slice(0, w[1].length - 1)
        .split(",")
    ])
);

let sum = 0;
for (const { x, m, a, s } of parts) {
  let currWorkflow = "in";

  while (true) {

    if (currWorkflow === "A") {
      sum += x + m + a + s;
      break;
    } else if (currWorkflow === "R") break;

    for (const instruction of workflows[currWorkflow]) {

      if (instruction.includes(":")) {

        if (eval(instruction.split(":")[0])) {
          currWorkflow = instruction.split(":")[1];
          break;
        }

      } else currWorkflow = instruction;

    }
  }

}

console.log(sum);


function getRanges(workflow, range) {
  if (workflow === "A") return [range];
  if (workflow === "R") return [];

  const subWorkflows = workflows[workflow];
  const ranges = [];

  for (const subWorkflow of subWorkflows) {

    if (subWorkflow.includes(":")) {
      const [condition, next] = subWorkflow.split(":")

      const crit = Number(condition.slice(2));

      if (condition[1] === "<") {
        if (range[condition[0] + "Min"] < crit) {
          const match = { ...range };
          match[condition[0] + "Max"] = crit - 1;
          range[condition[0] + "Min"] = crit;
          getRanges(next, match).forEach(r => ranges.push(r))
        }

      } else {
        if (range[condition[0] + "Max"] > crit) {
          const match = { ...range };
          match[condition[0] + "Min"] = crit + 1;
          range[condition[0] + "Max"] = crit;
          getRanges(next, match).forEach(r => ranges.push(r))
        }
      }

    } else getRanges(subWorkflow, range).forEach(r => ranges.push(r))

  }

  return ranges;
}

console.log(getRanges("in", {
  xMin: 1,
  xMax: 4000,
  mMin: 1,
  mMax: 4000,
  aMin: 1,
  aMax: 4000,
  sMin: 1,
  sMax: 4000
}).reduce(
  (a, { xMin, xMax, mMin, mMax, aMin, aMax, sMin, sMax }) =>
    a + (xMax - xMin + 1) * (mMax - mMin + 1) * (aMax - aMin + 1) * (sMax - sMin + 1),
  0
));
