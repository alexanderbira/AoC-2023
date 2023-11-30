import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

export default async function read(day) {
  return await readFile(join(dirname(fileURLToPath(import.meta.url)), `/inputs/day${day.toString().padStart(2, "0")}.txt`), "utf8");
}
