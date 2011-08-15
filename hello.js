var express = require('express');
var app = express.createServer();
app.get('/', function(req, res) {
	res.render('index.ejs', {
		layout : false,
		locals : {
			name : req.param('name') || 'anonymous'
		}
	});
});
/*
app.get('/mes', function(req, res) {
	callssapi(function(token){
             console.log('yea!!');
           var client = require('socket.io-client');
           var socket = client.connect('http://localhost:3000');
           socket.on('connect',function(){
             console.log('yea!!');
             socket.emit('message',token);
             socket.send('message',token);
             socket.emit('message','foo');
           });
           socket.on('done',function(){
             socket.send('done!');
             socket.emit('donedone!!');
             socket.disconnect();
             res.render('index.ejs', {
		layout : false,
		locals : {
			name : req.param('name') || 'anonymous'
		}
	     });
           });
*/
/*
           socket.on('message',function(msg){
             socket.send(msg);
             socket.broadcast.emit('message',msg);
             socket.broadcast.emit('message',token);
           });
           */
//                clientApp = require('./mapp.js');
//            clientApp(token);
//        });
//});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
var io = require('socket.io').listen(app);
io.sockets.on('connection', function(client) {
	client.on('message', function(msg) {
		client.send(msg);
		client.broadcast.emit('message', msg);
	});
	/*callssapi(function(token) {
		client.send(token);
		client.broadcast.emit('message', token);
	});*/

});

function callssapi(callback) {
	var sys = require('sys');
	var crypto = require('crypto');
	sys.puts('aaa');
	var hmac = crypto.createHmac("sha1", "763d5a941ff10918164040201cac86d4");
	var hash2 = hmac
			.update("api_key245ba237fa2b4e891d91d3431edd9d08passwordfdgosbisrzaDYooj04lq");
	var digest = hmac.digest(encoding = "hex");
	sys.puts("digest=" + digest);
	var http = require('https');

	http.get(
					{
						host : 'demo-dev2.smartseminar.jp',
						path : '/services/rest/authentication?api_key=245ba237fa2b4e891d91d3431edd9d08&api_sig='
								+ digest + '&password=fdgosbisrzaDYooj04lq'
					}, function(res) {
						var body = "";
						res.on('data', function(data) {
							body += data;
						});
						res.on('end', function() {
							var libxmljs = require("libxmljs");
							var xmlDoc = libxmljs.parseXmlString(body);
							var token = xmlDoc.root().childNodes()[0];
							console.log(token.text());
							console.log(body);
							callback(token.text());
						});
					});
}
