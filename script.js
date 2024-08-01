console.log("Welcome to Tic Tac Toe")
let music = new Audio("you like it.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover01.mp3")
let turn = "X";

// Function to change the turn
const changeTurn = () => {
    return turn === "X"?"0": "X"
}

// Function to check for a win 
const checkWin = () =>{

}

// game logic....
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = document.querySelector('.boxtext');
    boxtext.addEventListner ('click', ()=>{
        if(e.innerText === ''){
            e.innerText = turn;
            changeTurn();
            audioTurn.play();
            checkWin();


        }
    })

})



