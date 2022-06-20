const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const menu = `Seleccione una opción: 
1. Calcular area de un rectangulo.
2. Calcular area de un triangulo.
3. Calcular area de un cuadrado.
4. Calcular area de un circulo.
 `;

//  prompt es la pregunta
function input(prompt, callback) {
    rl.question(prompt, function (answer) { callback(answer) });
}

// ternario 
// const value = (condicion) ? valor si true : valor si false;

input(menu, function (answer) {
    switch (answer) {
        case '1':
        case '2':
            // obtener basel
            input('base:', function (base) {
                // obtener altura
                input('altura:', function (altura) {
                    // asigna la funcion dependiendo de la que fue seleccionada
                    const functionToExecute = answer == '1' ? getAreaRect : getAreaTriangle;
                    // personaliza mensaje dependiendo de la que fue seleccionada
                    const msg = answer == '1' ? 'Area Rectangulo:' : 'Area Triangulo';
                    // se concatena el mensaje con el retorno de la ejecucion de  la funcion correspondiente   
                    console.log(msg, functionToExecute(base, altura));
                    rl.close();
                });
            })
            break;
        case '3':
        case '4':
            // personaliza mensaje dependiendo de la que fue seleccionada
            const msg = answer == '3' ? 'Area Cuadrado:' : 'Area Circulo';
            // personaliza valor a obtener dependiendo de la que fue seleccionada
            const prompt = answer == '3' ? 'lado:' : 'radio:';
            // asigna la funcion dependiendo de la que fue seleccionada
            const functionToExecute = answer == '3' ? getAreaSquare : getAreaCircle;
            // obtener lado o radio
            input(prompt, function (value) {
                console.log(msg, functionToExecute(value));
                rl.close();
            });
            break;
        default:
            console.log('No existe esa opcion');
            rl.close();
            break;
    }
});



function getAreaRect(base, height) {
    return base * height;
}

function getAreaTriangle(base, height) {
    //base * altura /2 
    return (base * height) / 2;
}

function getAreaSquare(side) {
    //base * altura /2 
    return side * side;
}

function getAreaCircle(radius) {
    //pi por radio al cuadrado
    return Math.pow((Math.PI * radius), 2);
}










