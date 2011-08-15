exports = module.exports = abababa;


function abababa(token){
var socket = new io.Socket('localhost',{'port': 3000});

	socket.on('connect', function () {
		console.log('yay, connected!');
		socket.send('hi there!');
		socket.send('message',token);
		socket.broadcast.emit('message', token);

	});

	socket.on('message', function (msg) {
		console.log('a new message came in: ' + JSON.stringify(msg));
	});

	socket.connect();
}
