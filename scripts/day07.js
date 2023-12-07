import read from "../readFile.js";
const input = await read(7);

const hands = input
  .split("\n")
  .map(l => l.split(" "))
  .map(h=>[h[0], Number(h[1])]);

const order1 = "23456789TJQKA".split("");
const order2 = "J23456789TQKA".split("");

function numbers(hand, joker) {

  if (joker) {
    hand = hand.replace(/J/g, "");
  }

  let nums = [];
  for (let i = 0; i < 13; i++) {
    nums.push(hand.split(order1[i]).length - 1);
  }

  nums = nums.filter(n => n > 0).sort((n1, n2) => n2 - n1).join("");

  if (["5", "4", "3", "2", "1", ""].includes(nums)) return 6;
  if (["41", "31", "21", "11"].includes(nums)) return 5;
  if (["32", "22"].includes(nums)) return 4;
  if (["311", "211", "111"].includes(nums)) return 3;
  if (nums === "221") return 2;
  if (["2111", "1111"].includes(nums)) return 1;
  return 0;

}

console.log(hands.sort((h1, h2) => {
  const h1Strength = numbers(h1[0], false);
  const h2Strength = numbers(h2[0], false);
  if (h1Strength > h2Strength) return 1;
  if (h1Strength < h2Strength) return -1;

  for (let i = 0; i < 5; i++) {
    if (order1.indexOf(h1[0][i]) > order1.indexOf(h2[0][i])) return 1;
    if (order1.indexOf(h1[0][i]) < order1.indexOf(h2[0][i])) return -1;
  }

  return 1;
  
}).reduce((a, h, i) => a + h[1]*(i+1), 0));

console.log(hands.sort((h1, h2) => {
  const h1Strength = numbers(h1[0], true);
  const h2Strength = numbers(h2[0], true);
  if (h1Strength > h2Strength) return 1;
  if (h1Strength < h2Strength) return -1;

  for (let i = 0; i < 5; i++) {
    if (order2.indexOf(h1[0][i]) > order2.indexOf(h2[0][i])) return 1;
    if (order2.indexOf(h1[0][i]) < order2.indexOf(h2[0][i])) return -1;
  }

  return 11;
  
}).reduce((a, h, i) => a + h[1]*(i+1), 0));
