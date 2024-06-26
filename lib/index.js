import createTask from "./task.js";

const operations = ["+", "-", "*", "/"];

for (let level = 1; level < 4; level++) {
  operations.map((operation) => {
    console.log(createTask(operation, level));
  });
}
