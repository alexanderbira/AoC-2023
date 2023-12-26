import read from "../readFile.js";
const input = await read(25);

const groups = Object.fromEntries(
  input
    .split("\n")
    .map(l => l.split(": "))
    .map(x => [x[0], x[1].split(" ")])
);

Object.keys(groups)
  .forEach(k =>
    groups[k].forEach(v => {
      if (!groups[v]) groups[v] = [];
      groups[v].push(k);
    })
  );

function mergeNodes(graph, node1, node2) {
  const newNodeName = node1 + "," + node2;

  const newNode = [];
  graph[node1].forEach(n => {
    if (n !== node2) newNode.push(n);
  });

  graph[node2].forEach(n => {
    if (n != node1) newNode.push(n);
  });

  graph[newNodeName] = newNode;

  graph[newNodeName].forEach(n => {
    graph[n].forEach(n2 => {
      if (n2 == node1 || n2 == node2) {
        graph[n][graph[n].indexOf(n2)] = newNodeName;
      }
    });
  });

  delete graph[node1];
  delete graph[node2];
}

function* random(seed) {
  let x = Math.sin(seed) * 75202573;
  while (true) {
    x = Math.sin(x) * 75202573;
    yield x - Math.floor(x);
  }
}

const r = random(1.5); //1.5 is pretty fast for my input

while (true) {
  let graph = JSON.parse(JSON.stringify(groups));

  while (Object.keys(graph).length > 2) {
    const keys = Object.keys(graph);
    const node1 = keys[Math.floor(r.next().value * keys.length)];
    const node2 = graph[node1][Math.floor(r.next().value * graph[node1].length)];
    mergeNodes(graph, node1, node2);
  }

  if (graph[Object.keys(graph)[0]].length === 3) {
    console.log(
      Object.keys(graph)[0].split(",").length *
      Object.keys(graph)[1].split(",").length
    );
    break;
  }

}

// Doesn't work on the example input for some reason
