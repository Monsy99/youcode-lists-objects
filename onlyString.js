module.exports = onlyString = (...args) =>
  args.every((arg) => typeof arg === "string");
