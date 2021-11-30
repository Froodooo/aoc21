import { fetchInputData, writeInputData } from "./utilities.ts";

let data = await fetchInputData(2020, 1);
console.log(data);
await writeInputData(1, data);
