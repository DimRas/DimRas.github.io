/*jshint esnext: true */ 

'use strict';



let secretNumber = Math.trunc(Math.random()*20)+1;

let score = 20;

let highScore = 0;


document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value); 
    console.log(guess, typeof guess);
    
    //When no number
    if(!guess) {
//      document.querySelector('.message').textContent = 'No number!';
        document.querySelector('.message').innerHTML = '<ion-icon  name="ban-outline"></ion-icon>No number!';
        document.querySelector('ion-icon').style.color = 'red';
        
        
        
        
        
        
      //when player wins   
    } else if (guess == secretNumber) {
        document.querySelector('.message').innerHTML = '<ion-icon name="thumbs-up-outline"></ion-icon>Correct number!';
        document.querySelector('body').style.backgroundColor = 'green';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = secretNumber;
        
        if ( score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        } 
       
        
        
      //when guess is too high  
    } else if (guess > secretNumber) {
        if (score > 1 ) {
            document.querySelector('.message').innerHTML = '<ion-icon name="trending-up-outline"></ion-icon>Too high!';
            score = score - 1;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').innerHTML = '<p class="message"><ion-icon name="sad-outline"></ion-icon>You lost the game!</p>';
            document.querySelector('.score').textContent = 0;
            document.querySelector('body').style.backgroundColor = 'red';
            document.querySelector('.number').style.width = '30rem';
            document.querySelector('.number').textContent = secretNumber;
        }
        
      //when guess is too low   
    } else if (guess < secretNumber) {
        if (score > 1 ) {
            document.querySelector('.message').innerHTML = '<ion-icon name="trending-down-outline"></ion-icon>Too low!';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').innerHTML = '<ion-icon name="sad-outline"></ion-icon>You lost the game!';
            document.querySelector('.score').textContent = 0;
            document.querySelector('body').style.backgroundColor = 'red';
            document.querySelector('.number').style.width = '30rem';
            document.querySelector('.number').textContent = secretNumber;
        }
        
    } 
        
});

//Reload the game
document.querySelector('.again').addEventListener('click', function () {
    
    score = 20;
    
    secretNumber = Math.trunc(Math.random()*20)+1;
    
//    document.querySelector('.message').textContent = 'Start guessing...';
    document.querySelector('.message').innerHTML = '<ion-icon  name="arrow-forward-outline"></ion-icon>Start guessing...';
    
    
    document.querySelector('.score').textContent = score;
    
    document.querySelector('.number').textContent = '?';
    
    document.querySelector('.guess').value = ''; 
    
    document.querySelector('body').style.backgroundColor = '#222';
    
    document.querySelector('.number').style.width = '15rem';
     
});











