import {print} from '../print'
import {EButtonUsage} from "../../common/enum";


type CalculatorState = {
    result: number;
    currentInput: string;
    operator: string;
};


function add(a: number, b: number): number {
    return a + b;
}

function minus(a: number, b: number): number {
    return a - b;
}

function division(a: number, b: number): number {
    if (b === 0) {
        alert("Ошибка: деление на ноль");
        return a;
    }
    return a / b;
}

function  multiplication(a: number, b: number): number {
    return a * b;
}

const main = () => {
    let result: number = 0
    let currentInput: string = ''
    let operator: string = ''

    const calculate = ():CalculatorState => {
        const inputNumber = parseFloat(currentInput);
        if (isNaN(inputNumber)) return;

        switch (operator) {
            case EButtonUsage.OPERATOR_ADD:
                result = add(result, inputNumber)
                break
            case EButtonUsage.OPERATOR_SUBTRACT:
                result = minus(result, inputNumber)
                break
            case EButtonUsage.OPERATOR_DIVIDE:
                result = division(result, inputNumber)
                break
            case EButtonUsage.OPERATOR_MULTIPLY:
                result = multiplication(result, inputNumber)
                break
            default:
                result = inputNumber
                break
        }
        currentInput = ''
        operator = ''
        print(result)
    };

    return (state: EButtonUsage) => {
        switch (state) {
            case EButtonUsage.OPERATOR_AC:
                result = 0
                currentInput = ''
                operator = ''
                print(result)
                break;
            case EButtonUsage.OPERATOR_C:
                currentInput = ''
                print(result)
                break;
            case EButtonUsage.OPERATOR_EQUAL:
                calculate()
                break;
            case EButtonUsage.OPERATOR_ADD:
            case EButtonUsage.OPERATOR_SUBTRACT:
            case EButtonUsage.OPERATOR_DIVIDE:
            case EButtonUsage.OPERATOR_MULTIPLY:
                if (currentInput !== '') calculate()
                operator = state
                break;
            default:
                console.log(state)
                console.log(operator)
                if (state === EButtonUsage.OPERATOR_DECIMAL && currentInput.includes('.')) return
                currentInput += state
                print(currentInput)
                break;
        }
    };
}

export {main}



