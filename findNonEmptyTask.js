module.exports = findNonEmptyTasks = (tasksArray) =>
  tasksArray.find((task) => task?.content !== "");
