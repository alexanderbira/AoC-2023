import read from "../readFile.js";
const input = await read(4);

const cards = input
  .split("\n")
  .map(card => [
    ...card
      .split(":")[1]
      .split("|")
      .map(nums => nums
        .trim()
        .split(/\s+/g)
        .map(Number)
      ),
    1
  ]
  );

let points = 0;
let cardNum = 0;
for (const [winningNums, ourNums, numCopies] of cards) {

  let numMatches = 0;

  for (const ourNum of ourNums) {
    if (winningNums.includes(ourNum)) {
      numMatches++;
    }
  }

  for (let ci = cardNum; ci < cardNum + numMatches; ci++) {
    cards[ci + 1][2] += numCopies;
  }

  if (numMatches > 0) {
    points += 1 << numMatches - 1;
  }

  cardNum++;
}

console.log(points);
console.log(cards.reduce((a, c) => a + c[2], 0));
