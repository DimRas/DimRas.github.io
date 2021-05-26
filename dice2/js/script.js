/* jshint -W097 */
/* jshint -W104 */
/* jshint -W117 */
/* jshint -W098 */
/*jshint esnext: true */ 


'use strict';

//Selectin elements  
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


let scores, currentScore, activePlayer, playing; 

//Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};
init();

//1. Rolling dice functionality
const btnRollFun = btnRoll.addEventListener('click', function() {
    if(playing) {
        
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    
    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `img/dice-${dice}.png`;
    
    //3.Check for rolled 1; if true, switch to next player
    if(dice !== 1) {
        // Add dice to current score
        currentScore+=dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
    } else {
        // Switch to next player
         switchPlayer();
    }
}
});


const btnHoldFun = btnHold.addEventListener('click', function() {
    if (playing) {
   //1. Add current score to active player's score
   scores[activePlayer] += currentScore;
    // scores[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    //2. Check if player's score is >=100
    if (scores[activePlayer] >= 100) {
        // Finish the game
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        // Switch to the next player
        switchPlayer();
    }
}
});


btnNew.addEventListener('click', init);



//--------------------Modal window--------------------------------------//
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelectorAll('.show-modal');


const closeModal = function() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};


const openModal = function() {
//    console.log('Button clicked');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};


for (let i =0; i < btnShowModal.length; i++) 
    btnShowModal[i].addEventListener('click', openModal);


btnCloseModal.addEventListener('click', closeModal);


overlay.addEventListener('click',closeModal);


document.addEventListener('keydown', function(event) {
    console.log(event.key);
    
   
    if (event.key === "Escape") {
       
        if (!modal.classList.contains('hidden')) {
            closeModal();
        }
    }
});


















