export function calculate(a, operator, b) {
    if (a === '' || operator === '' || b === '') {
        throw new Error('Unknown operator');
    }

    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        default:
            throw new Error('Unknown operator');
    }
}
