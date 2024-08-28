const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

let players = [];
let currentTurn = 'X';

server.on('connection', (ws) => {
    // Limit to two players
    if (players.length < 2) {
        players.push(ws);
        ws.send(JSON.stringify({ type: 'init', player: players.length === 1 ? 'X' : 'O' }));
    } else {
        ws.close(); // Close connection if more than two players
    }

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.type === 'move' && players.includes(ws)) {
            // Broadcast move to the other player
            players.forEach(player => {
                if (player !== ws) {
                    player.send(JSON.stringify({
                        type: 'move',
                        index: data.index,
                        player: data.player
                    }));
                }
            });
        }

        // Check for reset
        if (data.type === 'reset') {
            currentTurn = 'X'; // Reset turn to 'X'
            players.forEach(player => player.send(JSON.stringify({ type: 'reset' })));
        }
    });

    ws.on('close', () => {
        players = players.filter(player => player !== ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
