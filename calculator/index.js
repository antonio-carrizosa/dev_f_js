const MAS = '+';
const MENOS = '-';
const POR = '*';
const ENTRE = '/';
const PUNTO = '.';
const IGUAL = '=';
const DEL = 'DEL';
const C = 'C';

const firstLine = [MAS, MENOS, POR, ENTRE];
const secondLine = [7, 8, 9, 0];
const thirdLine = [4, 5, 6, '.'];
const fourthLine = [1, 2, 3, IGUAL];
const fifthLine = [DEL, C];

const buttons = [fifthLine, firstLine, secondLine, thirdLine, fourthLine];

const container = document.createElement('div');
container.className = 'container';
document.body.append(container);

const input = document.createElement('input');
input.className = 'result';
input.type = 'text';
input.readOnly = true;
input.value = '0';

const calculatorDiv = document.createElement('div');
calculatorDiv.className = 'calculator';

container.append(input, calculatorDiv);

buttons.forEach((line) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';
    calculatorDiv.append(rowDiv);
    line.forEach((button) => {
        const btn = document.createElement('button');
        btn.innerHTML = button;
        rowDiv.append(btn);
    });
});

let expresion = '';

const handleClick = (e) => {
    const value = e.target.innerText;

    switch (value) {
        case DEL:
            if (expresion == '0') return;
            expresion = expresion.slice(0, -1);
            if (!expresion) expresion = '0';
            input.value = expresion;
            break;

        case C:
            expresion = '0';
            input.value = expresion;
            break;
        case IGUAL:
            try {
                expresion = eval(expresion);
                input.value = expresion;
            } catch (error) {
                input.value = '0';
            }
            break;
        default:
            if (value.length === 1) {
                expresion = expresion === '0' ? value : `${expresion}${value}`;
                input.value = expresion;
            }
    }
}

document.querySelector('body').addEventListener('click', handleClick);