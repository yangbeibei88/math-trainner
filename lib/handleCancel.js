export default (rl, tasks = []) => {
  rl.on("SIGINT", () => {
    const solvedCount = tasks.reduce((solvedCount, task) => {
      if (task.input !== "") {
        solvedCount++;
      }
      return solvedCount;
    }, 0);
    console.log(
      `\nToo bad you want to leave, you only solved ${solvedCount} of ${tasks.length} tasks.`
    );
    rl.close();
  });
};
