// datos por defecto
let initialData = {
    users: [
        {
            id: 1,
            nickname: 'john',
            nip: '1234',
            account_id: 1,
        },
        {
            id: 2,
            nickname: 'jane',
            nip: '5678',
            account_id: 2,
        },
        {
            id: 2,
            nickname: 'foo',
            nip: '8080',
            account_id: 3,
        },

    ],
    accounts: [
        {
            id: 1,
            balance: 200,
        },
        {
            id: 2,
            balance: 500,
        },
        {
            id: 3,
            balance: 700,
        },
    ]
};

// referencias a elementos del DOM
const formEl = document.getElementById('login-form');
const exitEl = document.getElementById('exit');

// referencias a elementos del formulario
const formNicknameEl = document.getElementById('nickname');
const formNipEl = document.getElementById('nip')

// referencia a h3 usuario actual
const welcomeEl = document.querySelector('#authenticated h3');

// referencia a saldo actual
const balanceEL = document.getElementById('balance');

// referencia a cards deposito y retiro
const depositEl = document.getElementById('deposit');
const withdrawEl = document.getElementById('withdraw');

/* VARIABLES */
let data;
let currentUser;
let balance;


/* COMMON */
const showToast = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'bottom',
        style: {
            background: 'linear-gradient(to right, #4cd6f0 0%, #5f86f7 100%)',
        }
    }).showToast();
}


/* PERSISTENCE */
const storage = localStorage;
const KEY = 'data';

const loadData = () => {
    const storedData = storage.getItem(KEY);
    if (storedData) {
        data = JSON.parse(storedData);
    } else {
        data = initialData;
        saveData(data);
    }
    console.log(data);
};

const saveData = (data) => {
    // la funcion se autoejecuta al arranque
    if (data) {
        storage.setItem(KEY, JSON.stringify(data));
    }
};


/* AUTH */
const clearForm = () => {
    formNicknameEl.value = '';
    formNipEl.value = '';
};

const updateUserAccount = (user, ammount) => {
    const newData = {
        ...data,
        accounts: data.accounts.map(account => account.id === user.account_id
            ? { ...account, balance: ammount }
            : account),
    };
    data = newData;
    saveData(data);
    console.log(newData);
};

const loadUser = (user) => {
    welcomeEl.innerHTML = `Welcome ${user.nickname}`;
    const account = data.accounts.find(account => account.id === currentUser.account_id);

    // setear balance
    balance = account.balance;
    balanceEL.innerHTML = `$ ${balance.toFixed(2)}`;

    location.href = './index.html#authenticated';
};

const signIn = (nickname, nip) => {
    loadData();
    const user = data.users.find(user => user.nickname === nickname);
    if (user && user.nip === nip) {
        currentUser = user;
        clearForm();
        loadUser(user);
    } else {
        showToast('Invalid nickname or nip');
    }
};

const signOut = () => {
    location.href = './index.html';
    user = null;
    balance = null;
}

// listeners

// formulario
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    signIn(formNicknameEl.value, formNipEl.value);
});

// elemento salir
exitEl.addEventListener('click', signOut);


/*  TRANSACTIONS AND BALANCE  */
const getAmmount = (answer) => parseFloat(prompt(answer));

const setBalance = (ammount) => {

    if (ammount < 10) {
        showToast('Transaction denied: Your must have at least $10');
        return;
    }

    if (ammount > 990) {
        showToast('Transaction denied: Your can´t have more than $990');
        return;
    }

    balance = ammount;
    balanceEL.innerHTML = `$ ${balance.toFixed(2)}`;
    updateUserAccount(currentUser, balance);
};


const runTransaction = (isDeposit = false) => {
    // para no alterar el balance actual
    const currentBalance = balance;

    const answer = isDeposit
        ? 'How much do you want to deposit?'
        : 'How much do you want to withdraw?';

    const ammount = getAmmount(answer);


    if (!isNaN(ammount)) {
        const newAmmount = isDeposit
            ? currentBalance + ammount
            : currentBalance - ammount;
        setBalance(newAmmount);
    }
};

// listeners

// card depositar
depositEl.addEventListener('click', () => runTransaction(true));

// card retirar
withdrawEl.addEventListener('click', () => runTransaction());


