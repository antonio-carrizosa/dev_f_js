const DELETE = '←';
const MAYUS = 'mayus';
const SPACE = 'space';

// teclas especiales
const specialKeys = [DELETE, MAYUS, SPACE];

// Arreglos de caracteres del teclado
const firstLine = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const secondLine = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', DELETE];
const thirdLine = [MAYUS, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'];
const fourthLine = ['z', 'x', 'c', 'v', 'b', 'n', 'm', ';', '.', '-']
const fifthLine = [SPACE];

// arreglo para agrupar todos los elemento del teclado
const lineChars = [firstLine, secondLine, thirdLine, fourthLine, fifthLine];

// se crea el input del resultado
const textArea = document.createElement('input');
textArea.id = 'result';
textArea.readOnly = true;

// se crea el div que contendra el teclado
const keyboardDiv = document.createElement('div');
keyboardDiv.className = 'keyboard';

// se agregan al documento
document.body.append(textArea, keyboardDiv);

// Capitalizar
const capitalize = (str) => str.split('').map((c, idx) => idx == 0 ? c.toUpperCase() : c).join('');

// Generar clases para teclas especiales
const getClass = (char) => {
    if (specialKeys.includes(char)) {
        return char == SPACE ? 'large' : 'medium';
    }
};

// Generar elemento de tipo boton
const createButton = (char) => {
    const button = document.createElement('button');
    button.innerHTML = capitalize(char);
    // obtener clases para especiales
    const className = getClass(char);
    if (className) {
        button.className = className;
        button.id = char;
    };
    return button;
};



// Renderizar contenido de la pagina
lineChars.forEach((chars, /* idx */) => {
    const section = document.createElement('div');
    // section.className = `section-${idx}`;
    section.className = 'row';
    keyboardDiv.appendChild(section);

    chars.forEach((c) => {
        const btn = createButton(c);
        section.appendChild(btn);
    });
});

let current = '';
let isMayus = false;

const handleClick = (e) => {
    // se extrae el texto dentro del elemento html y se pasa minusculas
    const value = e.target.innerText.toLowerCase();

    switch (value) {
        case SPACE:
            current = `${current} `;
            break;

        // si (isMayus == true) pasar a lower si no a upper
        case MAYUS:
            // se actualiza el valor de is mayus
            isMayus = !isMayus;

            const mayusEl = document.getElementById('mayus');
            if (isMayus) {
                mayusEl.classList.add(['active']);
            } else {
                mayusEl.classList.remove(['active']);
            }
            break;

        case DELETE:
            // current.length retorna false si esta vacio
            if (current.length) current = current.slice(0, -1);
            break;

        default:
            // reviso que el length del value sea igual a uno
            // por la manera en que se implemento el listener es necesaria 
            // esta validacion
            if (value.length == 1) {
                current = `${current}${isMayus ? value.toUpperCase() : value.toLowerCase()}`;
            }
            break;
    }
    textArea.value = current;
};


// Se agrega el listener para todo el elemento body
document.querySelector('body').addEventListener('click', handleClick);