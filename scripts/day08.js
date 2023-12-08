import read from "../readFile.js";
const input = await read(8);

let [instructions, graph] = input.split("\n\n")

graph = Object.fromEntries(
  graph
    .split("\n")
    .map(n => n.split(" = "))
    .map(n => [n[0], [n[1].slice(1,4), n[1].slice(6, 9)]])
);

const gcd = (a, b) => b===0 ? a : gcd(b, a % b);


let currNode = "AAA";
let numSteps = 0;
while (currNode !== "ZZZ") {
  currNode = graph[currNode][instructions[numSteps % instructions.length] === "R" ? 1 : 0];
  numSteps++;
}
console.log(numSteps);


const currNodes = Object.keys(graph).filter(i => i[2] === "A");
const times = [];
for (let numSteps = 0; currNodes.length; numSteps++) {

  for (let i = 0; i < currNodes.length; i++) {

    currNodes[i] = graph[currNodes[i]][instructions[numSteps % instructions.length] === "R" ? 1 : 0];

    if (currNodes[i][2] === "Z") {
      times.push(numSteps+1);
      currNodes.splice(i, 1);
      i--;
    }

  }

}
console.log(times.reduce((a, c) => a * c / gcd(a, c), times[0]));
