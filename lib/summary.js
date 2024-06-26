import * as emoji from "node-emoji";

export default (tasks) => {
  const correctCount = tasks.reduce((correctCount, task) => {
    if (task.input === task.correctResult) {
      correctCount++;
    }
    return correctCount;
  }, 0);

  const percent = (correctCount * 100) / tasks.length;

  if (percent === 100) {
    return emoji.emojify(
      `:trophy: Congratulations, you have solved all ${tasks.length} tasks correctly.
      `
    );
  } else if (percent >= 50) {
    return emoji.emojify(
      `:sunglasses: Very good, you have correctly solved ${correctCount} out of ${tasks.length} tasks.
      `
    );
  } else if (percent >= 1) {
    return emoji.emojify(
      `:cry: You have correctly solved ${correctCount} out of ${tasks.length} tasks, you can do better.`
    );
  } else {
    return emoji.emojify(
      `:skull_and_crossbones:
        Your answers to all ${tasks.length} tasks are wrong.
      `
    );
  }
};
