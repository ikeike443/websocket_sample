var client = require('socket.io-client');
var socket = client.connect('http://localhost:3000');

socket.on('connect',function(){
    console.log('yea!!');
//    socket.send('how are you? I am from node server side');
    socket.send('{myname:"ikeda"}');
    socket.disconnect();
    process.exit(0);
});

