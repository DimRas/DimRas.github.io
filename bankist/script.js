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

/////////////////////////////////////////////////
// Data


//alert('To Enter Your Account Use: (User: dr, Pin: 1111), (User: jd, Pin: 2222), (User: stw, Pin: 3333), (User: ss, Pin: 4444)');

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Dmitriy Raskin',
  movements: [200.4, 450.4, -400.4, 3000.4, -650.4, -130.4, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-10T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-02-04T17:01:17.194Z',
    '2021-02-05T23:36:17.929Z',
    '2021-02-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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




const formatMovementDate = function (date, locale) {
    
       // Operations With Dates
      const calcDaysPassed = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    
      const dayPassed = calcDaysPassed(new Date(), date);
      console.log(dayPassed);
    
    if (dayPassed === 0) return 'Today'; 
    else if (dayPassed === 1) return 'Yesterday'; 
    else if (dayPassed <= 7) return `${dayPassed} days ago`;
//    else {
//        
//    const day = `${date.getDay()}`.padStart(2, 0);
//      const month = `${date.getMonth() + 1}`.padStart(2, 0);
//      const year = date.getFullYear();
//      return `${day}/${month}/${year}`;
//        
//    } 
    return new Intl.DateTimeFormat(locale).format(date);
};




const formatCur = function(value, locale, currency) {
     return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value);
};




//display movements (using forEach)
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
    
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
    
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
      
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
      
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
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
  
    labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
//    console.log(balance);
};
//calcDisplayBalance(account1.movements);




// Income summary
const calcDisplaySummary = function(acc) {
    const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);
    console.log(incomes);
    
// Out summary
    const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);
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
    labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
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
    displayMovements(acc);
    // Display balance
    calcDisplayBalance(acc);
    // Display summary
    calcDisplaySummary(acc);
};





const startLogOutTimer = function () {
    
    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;
        
    // When 0 seconds, stop timer and log out user
    if (time === 0 ) {
        clearInterval(time);
        labelWelcome.textContent = 'Log in to get started';
        containerApp.style.opacity = 0;
    }
        
    // Decrese 1s
    time--;
        
    };
    
    // Set time to 5 min
    let time = 100;
    
    // Call the time every second
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
};





// Event handler
let currentAccount, timer;

// Fake always logged in
//currentAccount = account1;
//updateUI(currentAccount);
//containerApp.style.opacity = 100;




// Experimenting with API
const now = new Date();

const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
};

const locale = navigator.language;
console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat('en-GB', options).format(now);





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
    
    
    // Create current date and time
    const now = new Date();
//    const day = `${now.getDay()}`.padStart(2, 0);
//    const month = `${now.getMonth() + 1}`.padStart(2, 0);
//    const year = now.getFullYear();
//    const hour = `${now.getHours()}`.padStart(2, 0);
//    const min = `${now.getMinutes()}`.padStart(2, 0);
//    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    
    const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
//    weekday: 'long'
    };

//    const locale = navigator.language;
//    console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);



    
    
    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    
    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
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
    
    const amount = Math.floor((inputLoanAmount.value));
    
    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        
        setTimeout(function () {
            
        
        // Add movement
        currentAccount.movements.push(amount);
        
         // Add loan date
        currentAccount.movementsDates.push(new Date().toISOString());
        
        // Update UI
        updateUI(currentAccount);
            
          // Reset timer
        clearInterval(timer);
        timer = startLogOutTimer();
    
        }, 2500);
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
        
    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
        
    // Update UI
    updateUI(currentAccount);
        
    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
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

//---------------------------------------------------------------------------





