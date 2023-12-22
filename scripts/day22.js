import read from "../readFile.js";
const input = await read(22);

const bricks = input
  .split("\n")
  .map((brick, i) => [
    ...brick
      .split("~")
      .map(coord =>
        coord
          .split(",")
          .map(Number)
      ),
    i
  ])
  .sort((
    [[, , z1], [, , z2]], [[, , z3], [, , z4]]) => Math.min(z1, z2) - Math.min(z3, z4));

//I'm scared of thinking, so I'm keeping a set of all the cubes that make up the bricks for my collision detection
const fixedCubes = new Set();
const fixedCubesOwners = {};

function coordKey([x, y, z], start, adjust, type) {
  switch (type) {
    case "x":
      return `${start},${y},${z-adjust}`;
    case "y":
      return `${x},${start},${z-adjust}`;
    case "z":
      return `${x},${y},${start - adjust}`;
  }
}

//make the bricks fall
for (const brick of bricks) {
  const [[x1, y1, z1], [x2, y2, z2]] = brick;

  let type, start, end;
  if (x1 !== x2) {
    type = "x";
    start = Math.min(x1, x2);
    end = Math.max(x1, x2);
  } else if (y1 !== y2) {
    type = "y";
    start = Math.min(y1, y2);
    end = Math.max(y1, y2);
  } else {
    type = "z";
    start = Math.min(z1, z2);
    end = Math.max(z1, z2);
  }


  //see how far down we can move the brick until it collides with another brick
  let moveDownNum = 0;
  outer: while (true) {

    if (z1 - moveDownNum === 1) break;

    for (let i = start; i <= end; i++) {
      if (fixedCubes.has(coordKey([x1, y1, z1], i, moveDownNum+1, type))) break outer;
    }

    moveDownNum++;
  }

  //move the brick down
  brick[0][2] -= moveDownNum;
  brick[1][2] -= moveDownNum;

  for (let i = start; i <= end; i++) {
    const key = coordKey([x1, y1, z1], i, moveDownNum, type);
    fixedCubes.add(key);
    fixedCubesOwners[key] = brick[2];
  }

}

const supportedBy = {};
const supports = {};

//build a graph of which bricks are supported by which bricks
for (const brick of bricks) {
  const [[x1, y1, z1], [x2, y2, z2]] = brick;

  let type, start, end;
  if (x1 !== x2) {
    type = "x";
    start = Math.min(x1, x2);
    end = Math.max(x1, x2);
  } else if (y1 !== y2) {
    type = "y";
    start = Math.min(y1, y2);
    end = Math.max(y1, y2);
  } else {
    type = "z";
    start = Math.min(z1, z2);
    end = Math.max(z1, z2);
  }

  let supporting = new Set();
  let supporters = new Set();

  for (let i = start; i <= end; i++) {
    //check if the brick is supported by another brick
    const key1 = coordKey([x1, y1, z1], i, 1, type);
    if (fixedCubes.has(key1)) {
      if (fixedCubesOwners[key1] !== brick[2]) {
        supporters.add(fixedCubesOwners[key1]);
      }
    }

    //check if the brick is supporting another brick
    const key2 = coordKey([x1, y1, z1], i, -1, type);
    if (fixedCubes.has(key2)) {
      if (fixedCubesOwners[key2] !== brick[2]) {
        supporting.add(fixedCubesOwners[key2]);
      }
    }
  }

  supports[brick[2]] = supporting;
  supportedBy[brick[2]] = supporters;
}

//get the number of bricks that are safe to remove without causing a collapse
let numSafe = 0;
for (let i = 0; i < bricks.length; i++) {
  if (Array.from(supports[i]).every(brick => supportedBy[brick].size > 1)) numSafe++;
}
console.log(numSafe);


function getNumFall(brick, falling = new Set()) {
  falling.add(brick);

  let total = 0;

  supports[brick].forEach(support => {
    if (Array.from(supportedBy[support]).every(support => falling.has(support))) {
      total += getNumFall(support, falling) + 1;
    }
  });

  return total;
}

//get the sum of the number of bricks that will fall if we remove each brick
let totalFall = 0;
for (let i = 0; i < bricks.length; i++) {
  totalFall += getNumFall(i);
}
console.log(totalFall);
