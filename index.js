function precedence(operator) {
  if (operator == "^") {
    return 3;
  } else if (operator == "*" || operator == "/") {
    return 2;
  } else if (operator == "+" || operator == "-") {
    return 1;
  } else {
    return -1;
  }
}
function infixToPostfix(expression) {
  let stack = [];
  let result = "";

  for (let i = 0; i < expression.length; i++) {
    if (/[0-9a-z]+/i.test(expression[i])) {
      result += expression[i];
    } else if (
      expression[i] == "(" ||
      expression[i] == "{" ||
      expression[i] == "["
    ) {
      stack.push(expression[i]);
    } else if (
      expression[i] == ")" ||
      expression[i] == "}" ||
      expression[i] == "]"
    ) {
      while (
        stack[stack.length - 1] != "(" &&
        stack[stack.length - 1] != "{" &&
        stack[stack.length - 1] != "["
      ) {
        result += stack[stack.length - 1];
        stack.pop();
      }
      stack.pop();
    } else {
      while (
        stack.length != 0 &&
        precedence(expression[i]) <= precedence(stack[stack.length - 1])
      ) {
        result += stack[stack.length - 1];
        stack.pop();
      }
      stack.push(expression[i]);
    }
  }
  while (stack.length != 0) {
    result += stack[stack.length - 1];
    stack.pop();
  }
  return result;
}
let testExp = "A+B(C^D-E)";
console.log(infixToPostfix(testExp));
