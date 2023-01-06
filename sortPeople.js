module.exports = sortPeople = (people) =>
  people.sort((p1, p2) => p1.age - p2.age);
