import { createInterface } from "node:readline";
import chalk from "chalk";
import createTask from "./task.js";
import promisedQuestion from "./promisedQuestions.js";
import getOptions from "./getOptions.js";
import summary from "./summary.js";
import handleCancel from "./handleCancel.js";

const { level, amount } = getOptions();
console.log(`Default Level: ${level}, Default Amount: ${amount}`);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

// handleCancel(rl);

async function init() {
  const userName = await promisedQuestion("What is your name? ", rl);
  console.log(`Hello ${userName}`);

  const levelSelect = await promisedQuestion(
    "Select difficult level (default 2): ",
    rl
  );
  const selectedLevel = levelSelect ? parseInt(levelSelect, 10) : 2;
  console.log(`Level: ${selectedLevel}`);

  const amountSelect = await promisedQuestion(
    "Select amount (default 1): ",
    rl
  );

  const selectedAmount = amountSelect ? parseInt(amountSelect, 10) : 2;
  console.log(`Tasks: ${4 * selectedAmount}`);

  return { selectedLevel, selectedAmount };
}

// generate tasks based on provided options
function generateTasks(level, amount) {
  const operations = ["+", "-", "*", "/"];
  let tasks = [];
  operations.forEach((operation) => {
    for (let i = 0; i < amount; i++) {
      const task = createTask(operation, level);
      // console.log(`Generated task: ${JSON.stringify(task)}`);
      tasks.push(task);
    }
  });

  // console.log(`All tasks: ${JSON.stringify(tasks)}`);
  return tasks;
}

// handleCancel(rl, tasks);

async function question(index, tasks) {
  // console.log(`Asking question for task at index: ${index}`);
  if (tasks[index] && tasks[index].task) {
    const result = await promisedQuestion(`${tasks[index].task} = `, rl);
    tasks[index].input = parseInt(result);
    if (tasks[index].input === tasks[index].correctResult) {
      console.log(chalk.bold.green("Correct!"));
    } else {
      console.log(chalk.bold.red("Wrong!"));
    }

    if (++index < tasks.length) {
      question(index, tasks);
    } else {
      console.log(summary(tasks));
      rl.close();
    }
  } else {
    console.error("Task is undefined at index:", index);
    rl.close();
  }
}

async function main() {
  const { selectedLevel, selectedAmount } = await init();
  const tasks = generateTasks(selectedLevel, selectedAmount);
  handleCancel(rl, tasks);
  question(0, tasks);
}

main();
