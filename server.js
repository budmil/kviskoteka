const http = require('http');
const app = require('./backend/app');
const debug = require("debug")("node-angular");

const port = process.env.PORT || 3000;

app.set('port', port);
const server = http.createServer(app);



server.listen(port);

prviKontektovan = false;
drugiKontektovan = false;
prviID = null;
drugiID = null;
soba = 0;
cnt = 0;

const io = require('socket.io')(server);

io.on('connection', function (socket) {
   socket.join("soba" + soba);
   cnt++;
   if (cnt == 2) {
       cnt = 0;
       soba++;
   }
    
    socket.on('klik', function (data) {

        for (var prop in socket.rooms) {

            if (prop.substr(0,4) == "soba") {
                io.to(prop).emit('podaci',  data );
            }
        }        
            
       
    });
  });