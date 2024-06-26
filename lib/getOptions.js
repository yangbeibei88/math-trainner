import { program } from "commander";

export default (levelDefault = 2, amountDefault = 1) => {
  program
    .version("1.0.0")
    .option(
      "-l, --level <n>",
      "Difficulty level of tasks (1-3)",
      parseInt,
      levelDefault
    )
    .option("-a, --amount <n>", "Number of tasks", parseInt, amountDefault)
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
