var sys = require('sys');
var crypto = require('crypto');
sys.puts('aaa');
var hmac = crypto.createHmac("sha1", "763d5a941ff10918164040201cac86d4");
var hash2 = hmac.update("api_key245ba237fa2b4e891d91d3431edd9d08passwordfdgosbisrzaDYooj04lq");
var digest = hmac.digest(encoding="hex");
sys.puts("digest=" + digest);
var http = require('https');

http.get({
    host: 'demo-dev2.smartseminar.jp',
    path: '/services/rest/authentication?api_key=245ba237fa2b4e891d91d3431edd9d08&api_sig=' + digest + '&password=fdgosbisrzaDYooj04lq',
}, function(res) {
    var body = ""
    res.on('data', function(data) {
        body += data;
    });
    res.on('end', function() {
        var libxmljs = require("libxmljs");
        var xmlDoc = libxmljs.parseXmlString(body);
        var token = xmlDoc.root().childNodes()[0];
        console.log(token.text());
        console.log(body);
        var io = require('socket.io-client');
        var s = io.connect('http://localhost',{port:3000,document:this});//scoket.io has bug when sending request outside from browser.
        s.on('connection', function (socket) {
            socket.send(token.text());
        });
    });
});

