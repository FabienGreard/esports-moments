var express = require('express'),
    app = express(), // routes
    server = require('http').createServer(app), //server
    io = require('socket.io').listen(server), //socket listening
    ent = require('ent'), //block html caracter
    fs = require('fs'), //read file
    bodyParser = require('body-parser'); // parse variable

app.use(bodyParser.urlencoded({"extended" : false}));

app.use(express.static(__dirname + '/view')); //doc loading
app.use(express.static(__dirname + '/waiting')); //doc loading

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/view/index.html'); // html loading
});
app.get('/waiting', function(req, res) {
  res.sendFile(__dirname + '/waiting/index.html'); // html loading
});

io.sockets.on('connection', function(socket){ // socket init
  console.log("New Client");
});

server.listen(3000);
console.log("Listening to PORT 3000");
