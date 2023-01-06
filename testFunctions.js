const assert = require("assert");
const emoji = require("node-emoji");

const { log } = console;
const { emojify } = emoji;

const checkMark = emojify(":white_check_mark:");
const failMark = emojify(":x:");

let testsPassed;
let totalTests;

const runTestCase = ({ functionName, testCases, shallow }) => {
  try {
    console.log(
      `-------------------  ${functionName}  -----------------------`
    );
    const fn = require(`./${functionName}`);
    if (!fn || typeof fn !== "function") {
      log(`${functionName} does not exist or is not a function`);
      return;
    }

    testsPassed = 0;
    totalTests = testCases.length;
    testCases.forEach(({ arguments, expectedResult }) => {
      if (shallow) {
        assert.equal(
          fn(...arguments),
          expectedResult,
          `${functionName} with arguments ${JSON.stringify(arguments)} ` +
            failMark +
            "  " +
            `expected: ${JSON.stringify(expectedResult)}  ` +
            `got: ${fn(...arguments)}`
        );
      } else {
        assert.deepEqual(
          fn(...arguments),
          expectedResult,
          `${functionName} with arguments ${JSON.stringify(arguments)} ` +
            failMark +
            "  " +
            `expected: ${JSON.stringify(expectedResult)}  ` +
            `got: ${fn(...arguments)}`
        );
      }
      testsPassed++;
    });
    log();
    log(`All ${totalTests} tests passed ` + checkMark);
    log();
  } catch (e) {
    log(`${testsPassed} / ${totalTests} tests passed`);
    log(e.message);
  }
};

runTestCase({
  functionName: "mergeArrays",
  testCases: [
    {
      arguments: [
        [1, 2],
        [3, 4],
      ],
      expectedResult: [1, 2, 3, 4],
    },
    {
      arguments: [[], []],
      expectedResult: [],
    },
  ],
});

runTestCase({
  functionName: "exceptFirst",
  testCases: [
    {
      arguments: ["delfin", 2],
      expectedResult: [2],
    },
    {
      arguments: [[], {}, 2, null],
      expectedResult: [{}, 2, null],
    },
  ],
});

runTestCase({
  functionName: "last2Parameters",
  testCases: [
    {
      arguments: ["delfin", 2, 3, null, {}],
      expectedResult: [null, {}],
    },
    {
      arguments: ["delfin"],
      expectedResult: ["delfin"],
    },
  ],
});

runTestCase({
  functionName: "indexOf",
  testCases: [
    {
      arguments: ["delfin", ["delfin", "foo", "bar"]],
      expectedResult: 0,
    },
    {
      arguments: ["bar", ["delfin", "foo", "bar"]],
      expectedResult: 2,
    },
  ],
});

runTestCase({
  functionName: "findNonEmptyTask",
  testCases: [
    {
      arguments: [[{ content: "" }, { content: "Niepusty task" }]],
      expectedResult: { content: "Niepusty task" },
    },
    {
      arguments: [[{ content: "foo" }, { content: "" }]],
      expectedResult: { content: "foo" },
    },
  ],
});

runTestCase({
  functionName: "oddIndex",
  testCases: [
    {
      arguments: [[0, 2, 4, 8, 5]],
      expectedResult: 4,
    },
    {
      arguments: [[1, 2, 4, 8, 5]],
      expectedResult: 0,
    },
  ],
});

runTestCase({
  functionName: "hasStrawberry",
  testCases: [
    {
      arguments: [["banana", "apple", "strawberry"]],
      expectedResult: true,
    },
    {
      arguments: [["pineapple", "mango"]],
      expectedResult: false,
    },
  ],
  shallow: true,
});

runTestCase({
  functionName: "someAdult",
  testCases: [
    {
      arguments: [
        [
          { name: "Krzysiek", age: 17 },
          { name: "Szymon", age: 23 },
        ],
      ],
      expectedResult: true,
    },
    {
      arguments: [
        [
          { name: "Marcin", age: 15 },
          { name: "Kalina", age: 14 },
        ],
      ],
      expectedResult: false,
    },
    {
      arguments: [[]],
      expectedResult: false,
    },
  ],
  shallow: true,
});

runTestCase({
  functionName: "onlyString",
  testCases: [
    {
      arguments: ["Szymon", null, {}, []],
      expectedResult: false,
    },
    {
      arguments: [
        [
          { name: "Marcin", age: 15 },
          { name: "Kalina", age: 14 },
        ],
        "123",
      ],
      expectedResult: false,
    },
    {
      arguments: ["123", "foo", "bar"],
      expectedResult: true,
    },
  ],
  shallow: true,
});

runTestCase({
  functionName: "filterPremium",
  testCases: [
    {
      arguments: [["mercedes", "aUdi", "BMW"]],
      expectedResult: ["mercedes", "aUdi", "BMW"],
    },
    {
      arguments: [["Mercedes", "opel", "foo"]],
      expectedResult: ["Mercedes"],
    },
    {
      arguments: [["123", "foo", "bar"]],
      expectedResult: [],
    },
  ],
});

runTestCase({
  functionName: "getColors",
  testCases: [
    {
      arguments: [
        { brand: "mercedes", color: "red" },
        { brand: "audi", color: "yellow" },
      ],
      expectedResult: ["red", "yellow"],
    },
    {
      arguments: [],
      expectedResult: [],
    },
  ],
});

runTestCase({
  functionName: "sortPeople",
  testCases: [
    {
      arguments: [
        [
          { name: "Szymon", age: 99 },
          { name: "Krzysztof", age: 17 },
        ],
      ],
      expectedResult: [
        { name: "Krzysztof", age: 17 },
        { name: "Szymon", age: 99 },
      ],
    },
    {
      arguments: [
        [
          { name: "Marcin", age: 30 },
          { name: "Kalina", age: 20 },
          { name: "Domka", age: 10 },
        ],
      ],
      expectedResult: [
        { name: "Domka", age: 10 },
        { name: "Kalina", age: 20 },
        { name: "Marcin", age: 30 },
      ],
    },
  ],
});
