const form = document.querySelector('#form');

const rightEmail = 'example@mail.com'
const rightPassword = '123456'

const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email === rightEmail && password === rightPassword) {
        alert('Login successful');
    } else {
        alert('Invalid email or password');
    }

});

const clearInputs = () => {
    emailInput.value = '';
    passwordInput.value = '';
}
