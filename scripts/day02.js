import read from "../readFile.js";
const input = await read(2);

let games = input
  .split("\n") //get lines
  .map(game => game.split(": ")) //split game into id and rounds
  .map(parts => [ //take these parts 
    Number(parts[0].substring(5)), //get the game id (after "Game ")
    parts[1] //take all the rounds of the game
      .split("; ") //split them into individual rounds
      .map(round => Object.fromEntries( //take each round
        round
          .split(", ") //get all the number-colour pairs
          .map(colour => colour.split(" ")) //split into the number of cubes and colour of cubes
          .map(([num, col]) => [col, Number(num)]) //switch the order of them so that they can be fed into Object.fromEntries with the colour as the key
      ))
  ]);


let sum = 0;
outer: for (let game of games) {

  for (let round of game[1]) {
    if (
      (round?.red > 12) ||
      (round?.green > 13) ||
      (round?.blue > 14)
    ) continue outer;
  }

  sum += game[0];
}
console.log(sum);

let powerSum = 0;
for (let game of games) {

  let maxes = [0, 0, 0];
  for (let round of game[1]) {
    if (round?.red > maxes[0]) maxes[0] = round.red;
    if (round?.green > maxes[1]) maxes[1] = round.green;
    if (round.blue > maxes[2]) maxes[2] = round.blue;
  }

  powerSum += maxes[0] * maxes[1] * maxes[2];
}
console.log(powerSum);