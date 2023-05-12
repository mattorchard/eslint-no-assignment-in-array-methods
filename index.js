const methodNamesThatImplyPurity = new Set([
  "filter",
  "find",
  "findIndex",
  "findLast",
  "map",
  "flatMap",
  "some",
  "every",
]);

function doesCalleeImplyPurity(node) {
  if (!node.callee || node.callee.type !== "MemberExpression") return false;
  if (!node.callee.property) return false;
  return methodNamesThatImplyPurity.has(node.callee.property.name);
}

function closest(node, expressionType) {
  if (!node) return null;
  if (node.type === expressionType) return node;
  return closest(node.parent, expressionType);
}

module.exports = {
  meta: {
    name: "no-assignment-in-array-methods",
    type: "problem",
  },
  rules: {
    "no-assignment-in-array-methods": {
      meta: {
        type: "problem",
      },
      create: function (context) {
        function handleAssignmentExpression(node) {
          const callNode = closest(node, "CallExpression");
          if (!callNode || !doesCalleeImplyPurity(callNode)) return;

          context.report({
            node: node,
            message: "Prefer pure functions for this array method",
            data: undefined,
          });
        }
        return {
          "CallExpression > FunctionExpression AssignmentExpression":
            handleAssignmentExpression,
          "CallExpression > ArrowFunctionExpression AssignmentExpression":
            handleAssignmentExpression,
        };
      },
    },
  },
};
