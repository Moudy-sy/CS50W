function solution(S) {
    const stack = []; // create a stack to hold values

    for (const token of S.split(' ')) { // split the string by spaces and loop through the resulting tokens
        if (token === 'POP') { // if token is 'POP', remove the top value from the stack
            if (stack.length < 1) return -1; // if stack is empty, return -1
            stack.pop();
        } else if (token === 'DUP') { // if token is 'DUP', duplicate the top value on the stack
            if (stack.length < 1) return -1; // if stack is empty, return -1
            stack.push(stack[stack.length - 1]);
        } else if (token === '+') { // if token is '+', pop the top two values, add them, and push the result onto the stack
            if (stack.length < 2) return -1; // if there are less than two values on the stack, return -1
            const val1 = stack.pop();
            const val2 = stack.pop();
            const result = val1 + val2;
            if (Math.abs(result) > 1048575) return -1; // if result is outside the range of [-2^20, 2^20-1], return -1
            stack.push(result);
        } else if (token === '-') { // if token is '-', pop the top two values, subtract them, and push the result onto the stack
            if (stack.length < 2) return -1; // if there are less than two values on the stack, return -1
            const val1 = stack.pop();
            const val2 = stack.pop();
            const result = val2 - val1; // note the order of subtraction here
            if (Math.abs(result) > 1048575) return -1; // if result is outside the range of [-2^20, 2^20-1], return -1
            stack.push(result);
        } else if (token === '*') { // if token is '*', pop the top two values, multiply them, and push the result onto the stack
            if (stack.length < 2) return -1; // if there are less than two values on the stack, return -1
            const val1 = stack.pop();
            const val2 = stack.pop();
            const result = val1 * val2;
            if (Math.abs(result) > 1048575) return -1; // if result is outside the range of [-2^20, 2^20-1], return -1
            stack.push(result);
        } else { // otherwise, the token is a number, so parse it and push onto the stack
            const val = parseInt(token);
            if (isNaN(val) || val < -1048575 || val > 1048575) return -1; // if value is not a valid integer within the range of [-2^20, 2^20-1], return -1
            stack.push(val);
        }
    }

    if (stack.length !== 1) return -1; // if there is not exactly one value on the stack, return -1

    return stack[0]; // return the final value on the stack
}
