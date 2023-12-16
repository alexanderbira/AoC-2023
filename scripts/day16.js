import read from "../readFile.js";
const input = await read(16);

const spaces = input.split("\n").map(l => l.split(""));
const dim = spaces.length;


function getNumEnergised(startY, startX, startDir) {
  const energised = new Set();
  const energisedDir = new Set();

  const paths = [[startY, startX, startDir]];

  while (paths.length) {
    let [y, x, dir] = paths.pop();

    switch (dir) {
      case "R":
        if (x + 1 >= dim) continue;
        x++;
        break;
      case "L":
        if (x - 1 < 0) continue;
        x--;
        break;
      case "U":
        if (y - 1 < 0) continue;
        y--;
        break;
      case "D":
        if (y + 1 >= dim) continue;
        y++;
    }

    const nextTile = spaces[y][x];

    if (nextTile === "/") {
      dir = {
        "R": "U",
        "L": "D",
        "U": "R",
        "D": "L"
      }[dir];

    } else if (nextTile === "\\") {
      dir = {
        "R": "D",
        "L": "U",
        "U": "L",
        "D": "R"
      }[dir];

    } else if (nextTile === "|" && (dir === "R" || dir === "L")) {
      dir = "UD";
      
    } else if (nextTile === "-" && (dir === "U" || dir === "D")) {
      dir = "RL";
    }

    for (const newDir of dir) {

      if (!energisedDir.has(`${y},${x},${newDir}`)) {
        energisedDir.add(`${y},${x},${newDir}`);

        paths.push([y, x, newDir]);
        energised.add(`${y},${x}`);
      }

    }

  }

  return energised.size;
}

console.log(getNumEnergised(0, -1, "R"));

let max = 0;

for (let i = 0; i < dim; i++) {
  max = Math.max(
    max,
    getNumEnergised(-1, i, "D"),
    getNumEnergised(dim, i, "U"),
    getNumEnergised(i, -1, "R"),
    getNumEnergised(i, dim, "L")
  );
}

console.log(max);
