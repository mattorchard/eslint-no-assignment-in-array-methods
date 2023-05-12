const { rules } = require("../index.js");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

ruleTester.run(
  "no-assignment-in-array-methods",
  rules["no-assignment-in-array-methods"],
  {
    valid: [
      {
        code: `[].find((person) => person.name === "Bob")`,
      },
      {
        code: `[].find((person) => person.name == "Bob")`,
      },
      {
        code: `[].forEach((person) => person.name = "Bob")`,
      },
    ],
    invalid: [
      {
        code: `[].find((person) => person.name = "Bob")`,
        errors: [{ message: /./ }],
      },
      {
        code: "[].find(function(x) {x = 1})",
        errors: [{ message: /./ }],
      },
      {
        code: `
      [].find(x => {
        if (x > 1) {
          x = 1
        }
      })
      `,
        errors: [{ message: /./ }],
      },
    ],
  },
);
