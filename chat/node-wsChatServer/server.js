var WebSocketServer = require('ws').Server;
var PORT = 8087;
var wss = new WebSocketServer({port: PORT});
var messages = [];

wss.on('connection', function(ws) {
	messages.forEach(function(message) {
		wss.send(message);
	});

	ws.on('message', function(message) {
		console.log('Message received: %s', message);

		messages.push(message);

		wss.clients.forEach(function (conn) {
			conn.send(message);
		});
	});
});

console.log('WebSocket Server is running.');