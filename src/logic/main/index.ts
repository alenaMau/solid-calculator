import {print} from '../print'
import {EButtonUsage} from "../../common/enum";


type CalculatorState = {
    result: number;
    currentInput: string;
    operator: string;
};

class Calc {
    private readonly a: number;
    private readonly b: number;

    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    public plus(): number {
        return this.a + this.b;
    }

    public minus(): number {
        return this.a - this.b;
    }

    public division(): number {
        if (this.b === 0) {
            alert("Ошибка: деление на ноль");
            return this.a;
        }
        return this.a / this.b;
    }

    public multiplication(): number {
        return this.a * this.b;
    }
}

const main = () => {
    let calState: CalculatorState = {
        result: 0,
        currentInput: '',
        operator: ''
    };

    const calculate = (): void | undefined => {
        const inputNumber = parseFloat(calState.currentInput);
        if (isNaN(inputNumber)) return;

        let calculates = new Calc(calState.result, inputNumber)

        switch (calState.operator) {
            case EButtonUsage.OPERATOR_ADD:
                calState.result = calculates.plus()
                break
            case EButtonUsage.OPERATOR_SUBTRACT:
                calState.result = calculates.minus()
                break
            case EButtonUsage.OPERATOR_DIVIDE:
                calState.result = calculates.division()
                break
            case EButtonUsage.OPERATOR_MULTIPLY:
                calState.result = calculates.multiplication()
                break
            default:
                calState.result = inputNumber
                break
        }
        calState.currentInput = ''
        calState.operator = ''
    };

    return (state: EButtonUsage) => {
        switch (state) {
            case EButtonUsage.OPERATOR_AC:
                calState.result = 0
                calState.currentInput = ''
                calState.operator = ''
                print(calState.result)
                break;
            case EButtonUsage.OPERATOR_C:
                calState.currentInput = ''
                print(calState.result)
                break;
            case EButtonUsage.OPERATOR_EQUAL:
                calculate()
                print(calState.result)
                break;
            case EButtonUsage.OPERATOR_ADD:
            case EButtonUsage.OPERATOR_SUBTRACT:
            case EButtonUsage.OPERATOR_DIVIDE:
            case EButtonUsage.OPERATOR_MULTIPLY:
                if (calState.currentInput !== '') {
                    calculate()
                    print(calState.result)
                }
                calState.operator = state
                break;
            default:
                console.log(state)
                console.log(calState.operator)
                if (state === EButtonUsage.OPERATOR_DECIMAL && calState.currentInput.includes('.')) return
                calState.currentInput += state
                print(calState.currentInput)
                break;
        }
    };
}

export {main}



