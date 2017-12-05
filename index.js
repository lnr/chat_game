const WebSocket = require('ws');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });


app.use(express.static(__dirname + '/public'));



wss.on('connection', (ws, req) => {
	// console.log(ws);
    const ip = req.connection.remoteAddress;
	ws.on('message', message => {
		console.log('received: %s', message);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
				/*client !== ws &&*/
                client.send(ip + ': ' + message);
            }
        });
	});
	ws.send('Hello, man');
});

server.listen(3030, '0.0.0.0', () => console.log('Listening on %d', server.address().port));