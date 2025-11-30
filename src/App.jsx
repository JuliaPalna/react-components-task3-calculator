import { useState } from 'react';
import { listNumber } from './variables/listNumber';
import { calculate } from './utils/calculate';
import styles from './styles/app.module.css';

export const App = () => {
    const [operand1, setOperand1] = useState('');
    const [operand2, setOperand2] = useState('');
    const [operator, setOperator] = useState('');
    const [result, setResult] = useState('');
    const [isFinalResult, setIsFinalResult] = useState(false);

    const handleNumberClick = (number) => {
        if (operator === '') {
            setOperand1(operand1 + number);
        } else {
            setOperand2(operand2 + number);
        }

        if (isFinalResult) {
            setIsFinalResult(false);
        }
    };

    const handleOperatorResetClick = () => {
        setOperand1('');
        setOperand2('');
        setOperator('');
        setResult('');
        setIsFinalResult(false);
        return;
    };

    const handleOperatorEqualsClick = () => {
        const newResult = calculate(
            Number(operand1),
            operator,
            Number(operand2),
        );

        setResult(newResult);
        setIsFinalResult(true);
        return;
    };

    const handleOperatorMathClick = (mathOperator) => {
        if (operand1 === '') {
            return;
        }

        setOperator(mathOperator);

        if (isFinalResult) {
            setIsFinalResult(false);
        }
    };

    const handleClick = ({ target }) => {
        try {
            const currentButton = target.textContent;
            const isResetButton = currentButton === 'C';
            const isSubtractButton = currentButton === '-';
            const isAdditionButton = currentButton === '+';
            const isEqualsButton = currentButton === '=';
            const isNumberButton = !isNaN(Number(currentButton));

            if (isNumberButton) {
                handleNumberClick(currentButton);
            }

            if (isResetButton) {
                handleOperatorResetClick();
            }

            if (isEqualsButton) {
                handleOperatorEqualsClick();
            }

            if (isSubtractButton || isAdditionButton) {
                handleOperatorMathClick(currentButton);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Calculator</h1>

            <div
                className={`${styles.content} ${isFinalResult && styles['content-result']}`}
            >
                <p>
                    {operand1} {operator} {operand2}
                </p>

                {isFinalResult && <p>{result}</p>}
            </div>

            <ul className={styles.list} onClick={handleClick}>
                {listNumber.map((number) => {
                    return (
                        <li className={styles['list-item']} key={number}>
                            <button className={styles.button}>{number}</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
