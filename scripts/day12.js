import read from "../readFile.js";
const input = await read(12);

const lines = input
  .split("\n")
  .map(l => l.split(" "))
  .map(i => [
    i[0],
    i[1]
      .split(",")
      .map(Number)
  ]);


const memo = {};
function numConfigs(records, groups) {
  const memoKey = records + "," + groups.join(",");
  if (memoKey in memo) return memo[memoKey];

  if (groups.length === 0) {
    if (!records.includes("#")) {
      return memo[memoKey] = 1;
    }
    return memo[memoKey] = 0;
  }

  if (records.length < groups.reduce((a, c) => a + c, 0) + groups.length - 1) {
    return memo[memoKey] = 0;
  }
  
  if (records[0] === ".") {
    return memo[memoKey] = numConfigs(records.replace(/^\.+/, ""), groups);
  }

  if (records[0] === "#") {
    if (records[groups[0]] !== "#" && !records.slice(0, groups[0]).includes(".")) {
      return memo[memoKey] = numConfigs(records.slice(groups[0] + 1), groups.slice(1));
    }
    return memo[memoKey] = 0;
  }

  return memo[memoKey] = numConfigs(records.slice(1), groups) + numConfigs("#" + records.slice(1), groups);
}


console.log(
  lines
    .map(l => numConfigs(l[0], l[1]))
    .reduce((a, c) => a + c, 0)
);


console.log(
  lines
    .map(l => [
      new Array(5)
        .fill(l[0])
        .join("?"),
      new Array(5)
        .fill("")
        .map(_ => [...l[1]])
        .flat()
    ])
    .map(l => numConfigs(l[0], l[1]))
    .reduce((a, c) => a + c, 0)
);
