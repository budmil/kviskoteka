brojSobe = 0;
var redSpremnihTakmicara = new Map();
var mapa_takmicara_i_socketa = new Map();

var crvenizavrsio = false;
var plavizavrsio = false;
var crvenipobedio = false;
var plavipobedio = false;

exports = module.exports = function(io) {
io.on('connection', function (_socket) {
    //console.log('pre');
   // console.log(mapa_takmicara_i_socketa.keys());
    var socket;
     if (mapa_takmicara_i_socketa.has(_socket.handshake.query.takmicar)) {
         socket = mapa_takmicara_i_socketa.get(_socket.handshake.query.takmicar);
         let keys = Array.from( redSpremnihTakmicara.keys() );
         io.emit('noviPlaviTakmicar',  keys); 
        // console.log("if");
     } else {
       //  console.log("else");
    mapa_takmicara_i_socketa.set(_socket.handshake.query.takmicar, _socket);

   if(_socket.handshake.query.tip == "plavi") {
       redSpremnihTakmicara.set(_socket.handshake.query.takmicar,_socket.handshake.query.takmicar);
       let keys = Array.from( redSpremnihTakmicara.keys() );
       io.emit('noviPlaviTakmicar',  keys); 
   } else {
    let keys = Array.from( redSpremnihTakmicara.keys() )
    io.emit('noviPlaviTakmicar',  keys); 
   }
   socket = _socket;
    }
   // console.log('posle');
   // console.log(mapa_takmicara_i_socketa.keys());

   socket.on('igraj', data =>{
       mapa_takmicara_i_socketa.get(data.crveni).join("soba" + brojSobe);
        mapa_takmicara_i_socketa.get(data.plavi).join("soba" + brojSobe);
        io.to("soba"+brojSobe).emit("igra_pocinje", {plavi: data.plavi, crveni: data.crveni});
        brojSobe++;
    });


  
    socket.on('pogodak', function (data) {
        //console.log("VRATI REC ZA POGADJANJE ALO");
        for (var prop in socket.rooms) {
            if (prop.substr(0,4) == "soba") {
                var reci = ["krava", "trava", "zmaj", "covek", "automobil", "kuca", "racunar", "matematika"];
                let ret = reci[Math.floor((Math.random()*1000)%reci.length)];
                io.to(prop).emit("recZaPogadjanje", ret);
            }
        }                 
       
    });

    socket.on('disconnect', function() {
        console.log('diskonekt');

        console.log(mapa_takmicara_i_socketa.keys());

        

        mapa_takmicara_i_socketa.delete(socket.handshake.query.takmicar);  
        console.log('diskonek2t');
        console.log(mapa_takmicara_i_socketa.keys());

        redSpremnihTakmicara.delete(socket.handshake.query.takmicar);
        let keys = Array.from( redSpremnihTakmicara.keys() );
        io.emit('noviPlaviTakmicar',  keys);

    });
   
   
    socket.on('pogodio', function(pogodak) {
         if (crvenizavrsio == false) {
             crvenizavrsio = true;
             if (pogodak) crvenipobedio = true; else crvenipobedio = false;
         } else {
             plavizavrsio = true;
             if (pogodak) plavipobedio = true; else plavipobedio = false;

            var soba;
            for (var prop in socket.rooms) {
                if (prop.substr(0,4) == "soba") {
                    soba=prop;
                }
            }
             if (plavipobedio && crvenipobedio) io.to(soba).emit("rezultat", {plavi: 5, crveni : 5});
             if (plavipobedio && !crvenipobedio)io.to(soba).emit("rezultat", {plavi:10, crveni : 0});
             if (!plavipobedio && crvenipobedio)io.to(soba).emit("rezultat", {plavi:0, crveni : 10});
             if (!plavipobedio && !crvenipobedio)io.to(soba).emit("rezultat", {plavi:0, crveni : 0});

             
         }
    });

    
  });
}

