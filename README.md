# eslint-no-assignment-in-array-methods

eslint-no-assignment-in-array-methods

## Why

Performing assignment instead of comparison can be a tough bug to catch.
This plugin seeks to prevent this class of bug, at least in the code areas where automated detection is possible

### Example

```ts
const people = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];
const bob = people.find((person) => person.name = "Bob"); // ❌
const bob = people.find((person) => person.name === "Bob"); // ✅
```
