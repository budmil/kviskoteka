const http = require('http');
const app = require('./backend/app');
const debug = require("debug")("node-angular");

const port = process.env.PORT || 3000;

app.set('port', port);
const server = http.createServer(app);



server.listen(port);


module.exports = server;






//SOCKET IO 



var io = require('socket.io')(server);

file2 = require ('./backend/routes/file2')(io);

 