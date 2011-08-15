var client = require('socket.io-client');
var socket = client.connect('http://localhost:3000');
//var socket = client.connect('http://7f376dfa.dotcloud.com');

socket.on('connect',function(){
    console.log('yea!!');
    socket.send('how are you?');
    socket.disconnect();
    process.exit(0);
});
