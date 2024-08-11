console.log("Welcome to Tic Tac Toe")
let audioTurn = new Audio("Tingsound.mp3")
let turn = "X";
let isgameover = false;
let confettiInterval;   // Declare the interval globally....

// Function to change the turn
const changeTurn = () => {
    return turn === "X"? "0": "X"
}

// Function to check for a win 
const checkWin = () =>{
    let boxtext = document.getElementsByClassName('boxtext');
    console.log(boxtext)
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8],
    ] 
    wins.forEach (p =>{
     if((boxtext[p[0]].innerText === boxtext[p[1]].innerText) && (boxtext[p[1]].innerText === boxtext[p[2]].innerText) && (boxtext[p[0]].innerText !== "")) {
        document.querySelector('.info').innerText = boxtext[p[0]].innerText + " WON"
         isgameover = true ;
         startConfetti();    
           } 
    });
}

// Start confetti function .......

function startConfetti() {
  confetti({
      particleCount: 300,
      spread: 360,
      origin: { y: 0.4 }
  });
}

// logic ....

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener ('click', ()=>{
        
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            if (audioTurn.readyState >= 3) { // Checks if the audio is ready to play
                audioTurn.playbackRate = 3.0;
                audioTurn.play();
            }
            checkWin();
            if(!isgameover) {
                document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;
        }
    }
    });

});

// reset button ......

   document.getElementById('reset').addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;

});
  