const arg = process.argv[2].toString().padStart(2, "0");
console.log(`Running Day ${arg}:`);
console.time("Finished in");
import(`./scripts/day${arg}.js`).catch((err) => {
  console.log("Error:", err);
}).then(()=>console.timeEnd("Finished in"));