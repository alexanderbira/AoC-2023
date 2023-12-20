import read from "../readFile.js";
const input = await read(20);

const modules = Object
  .fromEntries(input.split("\n")
    .map(l => l.split(" -> "))
    .map(m => {

      // broadcaster
      if (m[0] === "broadcaster") {
        return ["broadcaster", {
          targets: m[1].split(", ")
        }];
      }

      // %
      if (m[0][0] === "%") {
        return [m[0].slice(1), {
          type: m[0][0],
          targets: m[1].split(", "),
          state: 0
        }];
      }

      // &
      return [m[0].slice(1), {
        type: m[0][0],
        targets: m[1].split(", "),
        dependencies: {}
      }];

    })
  );

/*
modules = {
  broadcaster: {
    targets: [
      moduleName,
      ...
    ]
  },
  flipFlopName: {
    type: "%",
    targets: [
      moduleName,
      ...
    ],
    state: 0|1
  },
  conjunctionName: {
    type: "&",
    targets: [
      moduleName,
      ...
    ],
    dependencies: {
      moduleName: 0|1,
      ...
    }
  },
  ...
}
*/

for (const moduleName of Object.keys(modules)) {
  for (const target of modules[moduleName].targets) {
    if (modules[target] && modules[target].type === "&") {
      modules[target].dependencies[moduleName] = 0;
    }
  }
}

const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
const lcm = (a, b) => a * b / gcd(a, b);

const rxDependency = Object.keys(modules).find(x => modules[x].targets.includes("rx"));
const rxDependencies = Object.keys(modules).filter(x => modules[x].targets.includes(rxDependency));

let numLow = 0;
let numHigh = 0;
let cycleLength = 1;

for (let i = 0; rxDependencies.length || i <= 1000; i++) {
  if (i === 1000) console.log(numLow * numHigh);
  
  const pulsesToProcess = [];
  
  numLow++; // button press
  modules["broadcaster"].targets.forEach(target => pulsesToProcess.push({ to: target, pulse: 0, from: "broadcaster" }));

  while (pulsesToProcess.length) {
    const { to, pulse, from } = pulsesToProcess.shift();

    if (pulse === 0) numLow++;
    else numHigh++;

    const module = modules[to];
    if (!module) continue;

    if (module.type === "%") {
      if (pulse === 1) continue;

      const newState = 1 - module.state;
      module.state = newState;
      module.targets.forEach(target => pulsesToProcess.push({ to: target, pulse: newState, from: to }));

    } else { // &
      module.dependencies[from] = pulse;

      const allHigh = Object.keys(module.dependencies).findIndex(d => module.dependencies[d] === 0) === -1;
      const newPulse = allHigh ? 0 : 1;
      module.targets.forEach(target => pulsesToProcess.push({ to: target, pulse: newPulse, from: to }));

      if (!allHigh && rxDependencies.includes(to)) {
        rxDependencies.splice(rxDependencies.indexOf(to), 1);
        cycleLength = lcm(cycleLength, i + 1);
      }

    }
  }

}

console.log(cycleLength);
