import { createInterface } from "node:readline";
import createTask from "./task.js";
import promisedQuestion from "./promisedQuestions.js";
import getOptions from "./getOptions.js";

const { level, amount } = getOptions();

const operations = ["+", "-", "*", "/"];
let tasks = [];

operations.forEach((operation) => {
  for (let i = 0; i < amount; i++) {
    tasks.push(createTask(operation, level));
  }
});

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// const user = {
//   name: "",
//   city: "",
// };

// user.name = await promisedQuestion("What's your name? ");
// user.city = await promisedQuestion("Where do you live? ");

// console.log(`Hello ${user.name} from ${user.city}!`);

async function question(index) {
  const result = await promisedQuestion(`${tasks[index].task} = `, rl);
  tasks[index].input = parseInt(result);
  if (tasks[index].input === tasks[index].correctResult) {
    console.log("Correct!");
  } else {
    console.log("Wrong!");
  }

  if (++index < tasks.length) {
    question(index);
  } else {
    rl.close();
  }
}

question(0);
