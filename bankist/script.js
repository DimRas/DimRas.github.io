/* jshint -W097 */
/* jshint -W104 */
/* jshint -W117 */
/* jshint -W098 */
/* jshint -W030 */
/*jshint esnext: true */

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

alert('to enter your account use: (user: dr, pin: 1111),(user: jd, pin: 2222),(user: stw, pin: 3333), (user: ss, pin: 4444)');

// Data
const account1 = {
  owner: 'Dmitriy Raskin',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');




//display movements (using forEach)
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
    
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
    
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}\u20AC</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//displayMovements(account1.movements);
//console.log(account1.movements);




// Calc and display balance (using reduce) 
const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce(function (acc, cur, i, arr) {
    return acc + cur;
    }, 0);
  
    labelBalance.textContent = `${acc.balance}\u20AC`;
//    console.log(balance);
};
//calcDisplayBalance(account1.movements);




// Income summary
const calcDisplaySummary = function(acc) {
    const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}\u20AC`;
    console.log(incomes);
    
// Out summary
    const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}\u20AC`;
    console.log(out);
    
 //interest   
    const interest = acc.movements
    .filter(mov => mov >0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
        console.log(arr);
        return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);   
    labelSumInterest.textContent = `${interest}\u20AC`;
};
//calcDisplaySummary(account1.movements);




// Create a user names, looped over the accounts array edit a username to it based on the account owner (using map)
const createUsernames = function(accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map(function (name) {
        return name[0];
        }).join('');
    });  
};
createUsernames(accounts);
console.log(accounts);
//// Create a user names 
//const user = 'Steven Thomas Williams'; // stw
//const username = user
//.toLowerCase().split(' ')
//.map(function (name) {
//    return name[0];
//}).join('');
//
//console.log(username);




const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);
    // Display balance
    calcDisplayBalance(acc);
    // Display summary
    calcDisplaySummary(acc);
};




// Event handler
let currentAccount;

btnLogin.addEventListener('click', function(e) {
    // Prevent form from submitting
    e.preventDefault();
// Find method using 
currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);
    
if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
//    // Display movements
//    displayMovements(currentAccount.movements);
//    // Display balance
//    calcDisplayBalance(currentAccount);
//    // Display summary
//    calcDisplaySummary(currentAccount);
    
    // Update UI
    updateUI(currentAccount);
}
});




btnLoan.addEventListener('click', function(e) {
    e.preventDefault();
    
    const amount = Number(inputLoanAmount.value);
    
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        // Add movement
        currentAccount.movements.push(amount);
        // Update UI
        updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
});


btnTransfer.addEventListener('click', function(e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
//    console.log(amount, receiverAcc);
    inputTransferAmount.value = inputTransferTo.value = '';
    
    if(amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc.username !== currentAccount.username) {
//        console.log('transfer valid');
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
    }
});



btnClose.addEventListener('click', function (e) {
    e.preventDefault();
   
    if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        
    const index = accounts.findIndex(function (acc) {
        return acc.username === currentAccount.username;
    });
//        console.log(index);
    // Delete account   
    accounts.splice(index, 1);
        
    // Hide UI
    containerApp.style.opacity = 0;
    }
    
     // Clear fields
    inputCloseUsername.value = inputClosePin.value = '';
});



// Sort method
let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});








 ///////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////





