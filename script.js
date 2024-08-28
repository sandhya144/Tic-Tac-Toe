console.log("Welcome to Tic Tac Toe")
let audioTurn = new Audio("Tingsound.mp3");
let turn = "X";
let isgameover = false;
let player;
let ws;

// Replace this with your WebSocket server's public URL
const WS_URL = 'wss://your-websocket-server-url';  // Example: wss://your-app.herokuapp.com


// code of websocket...... 

function initializeWebSocket() {
    ws = new WebSocket('ws://localhost:8080');
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'init') {
            player = data.player;
            document.querySelector('.info').innerText = `You are Player ${player}. Turn for ${turn}`;
        }

        if (data.type === 'move') {
            const boxtext = document.getElementsByClassName('boxtext')[data.index];
            boxtext.innerText = data.player;
            audioTurn.play();  // Play ting sound when a move is received
            turn = changeTurn();
            document.querySelector('.info').innerText = `Turn for ${turn}`;
            checkWin();
        }

        if (data.type === 'reset') {
            resetGame();
        }
    };
}

initializeWebSocket();

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check for a win
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
    ];
    wins.forEach(p => {
        if ((boxtext[p[0]].innerText === boxtext[p[1]].innerText) && (boxtext[p[1]].innerText === boxtext[p[2]].innerText) && (boxtext[p[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[p[0]].innerText + " WON";
            isgameover = true;
            startConfetti();
        }
    });
}

// Start confetti function
function startConfetti() {
    confetti({
        particleCount: 300,
        spread: 360,
        origin: { y: 0.4 }
    });
}

// Game Logic......
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element, index) => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover && turn === player) {
            boxtext.innerText = turn;
            audioTurn.play();  // Play ting sound when a move is made locally
            turn = changeTurn();
            ws.send(JSON.stringify({ type: 'move', index: index, player: boxtext.innerText }));
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset button
document.getElementById('reset').addEventListener('click', () => {
    resetGame();
    ws.send(JSON.stringify({ type: 'reset' }));
});

function resetGame() {
    let boxtext = document.querySelectorAll('.boxtext');
    Array.from(boxtext).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.getElementsByClassName('info')[0].innerText = "Turn for " + turn;
}
