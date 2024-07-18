import { program, InvalidArgumentError } from "commander";

// custom parser for integer level and amount
// if directly parsing parseInt as the third arg without the custom function, will generate NaN
function parseInteger(value, dummyPrevious) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError("Not a number.");
  }
  return parsedValue;
}

export default (levelDefault = 2, amountDefault = 2) => {
  program
    .version("1.0.0")
    .option(
      "-l, --level <n>",
      "Difficulty level of tasks (1-3)",
      parseInteger,
      levelDefault
    )
    .option("-a, --amount <n>", "Number of tasks", parseInteger, amountDefault)
    .parse(process.argv);

  const options = program.opts();

  return {
    level: options.level,
    amount: options.amount,
  };
};

/** Before importing commander, mannual set command line options START */
// export default function getOptions(levelDefault = 2, amountDefault = 1) {
//   const level = getOptionValue(getOption("level"), levelDefault);
//   const amount = getOptionValue(getOption("amount"), amountDefault);
//   return { level, amount };
// }

// function getOption(optionName) {
//   return process.argv.find((element) => element.includes(optionName));
// }

// function getOptionValue(option, defaultValue) {
//   if (option) {
//     const [, value] = option.split("=");
//     return parseInt(value, 10);
//   }
//   return defaultValue;
// }
/** Before importing commander, mannual set command line options END */
