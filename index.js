const WebSocket = require('ws');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });
const Fighter = require('./src/Fighter');


app.use(express.static(__dirname + '/public'));



wss.on('connection', (ws, req) => {

    // const ip = req.connection.remoteAddress;

    let fighter = new Fighter();

    send(ws, {
        action: 'shake',
        body: fighter
    });

    ws.on('message', message => {

        let {action, direction, body} = JSON.parse(message);

        if (action === 'move') {
            fighter.move(direction);
            send(ws, {
                action: 'updateField',
                body: fighter
            });
            return;
        }

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
				/*client !== ws &&*/
                send(client, {
                    action: 'message',
                    body: fighter.name + ': ' + body
                });
            }
        });
	});

    function send(webSocket, data) {
        webSocket.send(JSON.stringify(data));
    }
});

server.listen(3030, '0.0.0.0', () => console.log('Listening on %d', server.address().port));