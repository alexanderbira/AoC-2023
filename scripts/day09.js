import read from "../readFile.js";
const input = await read(9);

const sequences = input.split("\n").map(l => l.split(" ").map(Number));

function getTheTerm(terms, getNext) {
  if (terms.every(x => x === 0)) return 0;

  const differences = [];
  for (let i = 1; i < terms.length; i++)
    differences.push(terms[i] - terms[i - 1]);

  return getNext ?
    terms[terms.length - 1] + getTheTerm(differences, getNext) :
    terms[0] - getTheTerm(differences, getNext);
}

console.log(sequences.reduce((a, c) => a + getTheTerm(c, true), 0));
console.log(sequences.reduce((a, c) => a + getTheTerm(c, false), 0));
