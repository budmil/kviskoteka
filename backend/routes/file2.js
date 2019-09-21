const Anagram = require("../models/anagram");
const Pehar = require("../models/pehar");

brojSobe = 0;
var redSpremnihTakmicara = new Map();
var mapa_takmicara_i_socketa = new Map();

var crvenizavrsio = false;
var plavizavrsio = false;
var crvenipobedio = false;
var plavipobedio = false;
var brojKontektovanihMojBroj = 0;
var brojKontektovanihAnagram = 0;
var naReduMojBroj = "plavi";
var naReduAnagram = "plavi";
var brojKontektovanihPehar = 0;
var naReduPehar = "plavi";

var brojPromasajaPehar = new Array(13);
for (let iii = 0; iii < 13; iii++) {
    brojPromasajaPehar[iii] = 0;
}

exports = module.exports = function (io) {
    io.on('connection', function (_socket) {
        //console.log('pre');
        // console.log(mapa_takmicara_i_socketa.keys());
        var socket = _socket;

        if (!_socket.handshake.query.supervizor) {


            if (mapa_takmicara_i_socketa.has(_socket.handshake.query.takmicar)) {
                socket = mapa_takmicara_i_socketa.get(_socket.handshake.query.takmicar);
                let keys = Array.from(redSpremnihTakmicara.keys());
                io.emit('noviPlaviTakmicar', keys);
                // console.log("if");
            } else {
                //  console.log("else");
                mapa_takmicara_i_socketa.set(_socket.handshake.query.takmicar, _socket);

                if (_socket.handshake.query.tip == "plavi") {
                    redSpremnihTakmicara.set(_socket.handshake.query.takmicar, _socket.handshake.query.takmicar);
                    let keys = Array.from(redSpremnihTakmicara.keys());
                    io.emit('noviPlaviTakmicar', keys);
                } else {
                    let keys = Array.from(redSpremnihTakmicara.keys())
                    io.emit('noviPlaviTakmicar', keys);
                }
                socket = _socket;
            }
        }
        // console.log('posle');
        // console.log(mapa_takmicara_i_socketa.keys());

        socket.on('geografija/zaSupervizora', pojam => {
            io.emit("zaSupervizora", { pojam: pojam });
        });

        socket.on('supervizor/vracamProverenPojam', data => {
            console.log("supervizor vracammmmm");
            console.log(data);
            io.emit('geografija/vracamProverenPojam', { data: data })
        });

        socket.on('igraj', data => {
            mapa_takmicara_i_socketa.get(data.crveni).join("soba" + brojSobe);
            mapa_takmicara_i_socketa.get(data.plavi).join("soba" + brojSobe);
            io.to("soba" + brojSobe).emit("igra_pocinje", { plavi: data.plavi, crveni: data.crveni });
            brojSobe++;
        });



        socket.on('pogodak', function (data) {
            //console.log("VRATI REC ZA POGADJANJE ALO");
            for (var prop in socket.rooms) {
                if (prop.substr(0, 4) == "soba") {
                    var reci = ["krava", "trava", "zmaj", "covek", "automobil", "kuca", "racunar", "matematika"];
                    let ret = reci[Math.floor((Math.random() * 1000) % reci.length)];
                    io.to(prop).emit("recZaPogadjanje", ret);
                }
            }

        });

        socket.on('disconnect', function () {
            console.log('diskonekt');

            console.log(mapa_takmicara_i_socketa.keys());



            mapa_takmicara_i_socketa.delete(socket.handshake.query.takmicar);
            console.log('diskonek2t');
            console.log(mapa_takmicara_i_socketa.keys());

            redSpremnihTakmicara.delete(socket.handshake.query.takmicar);
            let keys = Array.from(redSpremnihTakmicara.keys());
            io.emit('noviPlaviTakmicar', keys);

        });


        socket.on('pogodio', function (pogodak) {
            if (crvenizavrsio == false) {
                crvenizavrsio = true;
                if (pogodak) crvenipobedio = true; else crvenipobedio = false;
            } else {
                plavizavrsio = true;
                if (pogodak) plavipobedio = true; else plavipobedio = false;

                var soba;
                for (var prop in socket.rooms) {
                    if (prop.substr(0, 4) == "soba") {
                        soba = prop;
                    }
                }
                if (plavipobedio && crvenipobedio) {
                    io.to(soba).emit("rezultat", { plavi: 5, crveni: 5, naRedu: naReduMojBroj });
                }
                if (plavipobedio && !crvenipobedio) {
                    io.to(soba).emit("rezultat", { plavi: 10, crveni: 0, naRedu: naReduMojBroj });
                }
                if (!plavipobedio && crvenipobedio) {
                    io.to(soba).emit("rezultat", { plavi: 0, crveni: 10, naRedu: naReduMojBroj });
                }
                if (!plavipobedio && !crvenipobedio) {
                    io.to(soba).emit("rezultat", { plavi: 0, crveni: 0, naRedu: naReduMojBroj });
                }
                naReduMojBroj = "crveni";
            }
        });

        ////////////////////////////mojbroj/////////////////////////////////////////////////////////////////////////////

        socket.on('mojbroj/vratiPocetniBroj', function (data) {
            console.log('mojbroj ' + naReduMojBroj);
            if (brojKontektovanihMojBroj == 0) brojKontektovanihMojBroj++; else {
                brojKontektovanihMojBroj = 0;
                for (var prop in socket.rooms) {
                    if (prop.substr(0, 4) == "soba") {
                        var broj = Math.floor((Math.random() * 1000) % 999) + 1;
                        io.to(prop).emit("mojbroj/pocetniBroj", { trazeniBroj: broj, naRedu: naReduMojBroj });
                    }
                }
                naReduMojBroj = "crveni";

            }
        });

        socket.on('mojbroj/dodajBroj', function (data) {
            for (var prop in socket.rooms) {
                if (prop.substr(0, 4) == "soba") {
                    io.to(prop).emit("mojbroj/dodatBroj", { koji: data.koji, broj: data.broj });
                }
            }
        });

        ///////////////////////////anagram//////////////////////////////////////////////////////////

        socket.on('anagram/dohvatiAnagram', function (data) {
            console.log("dohvati Anagram");
            if (brojKontektovanihAnagram == 0) {
                console.log(brojKontektovanihAnagram);
                brojKontektovanihAnagram++;
            } else {
                brojKontektovanihAnagram = 0;
                Anagram.count().exec(function (err, count) {
                    var random = Math.floor(Math.random() * count);
                    Anagram.findOne().skip(random).exec(function (err, anagram) {
                        for (var prop in socket.rooms) {
                            if (prop.substr(0, 4) == "soba") {
                                console.log(naReduAnagram);
                                io.to(prop).emit("anagram/vracamAnagram", { anagram: anagram.zagonetka, resenje: anagram.resenje, naRedu: naReduAnagram });
                            }
                        }
                        naReduAnagram = "crveni";
                    });
                });

            }
        });

        socket.on('anagram/zavrsioAnagram', function (data) {
            naReduAnagram = "plavi";

            if (brojKontektovanihAnagram == 0) {
                brojKontektovanihAnagram++;
            } else {
                brojKontektovanihAnagram = 0;
                for (var prop in socket.rooms) {
                    if (prop.substr(0, 4) == "soba") {
                        io.to(prop).emit("anagram/mozesDaljeAnagram");
                    }
                }

            }
        });


        ///////////////////////////////////pehar/////////////////////////////////////////

        socket.on('pehar/proveriPehar', function (data) {
            var otkrijResenje = false;
            console.log(data.boja);
            console.log(data.i);

            if (data.tacno) {
                for (var prop in socket.rooms) {
                    if (prop.substr(0, 4) == "soba") {
                        io.to(prop).emit("pehar/naReduJe", { naRedu: data.boja, tacno: data.tacno, i: data.i, otkrijResenje: otkrijResenje });
                    }
                }
            } else {
                console.log(brojPromasajaPehar[data.i]);
                brojPromasajaPehar[data.i]++;
                if (brojPromasajaPehar[data.i] == 2) otkrijResenje = true;
                var naRedu;
                if (data.boja == "crveni") naRedu = "plavi"; else naRedu = "crveni";
                for (var prop in socket.rooms) {
                    if (prop.substr(0, 4) == "soba") {
                        io.to(prop).emit("pehar/naReduJe", { naRedu: naRedu, tacno: data.tacno, i: data.i, otkrijResenje: otkrijResenje });
                    }
                }


            }
        });

        socket.on('pehar/dohvatiPehar', function (data) {
            for (let ii = 0; ii < 13; ii++) {
                brojPromasajaPehar[ii] = 0;
            }
            if (brojKontektovanihPehar == 0) {
                brojKontektovanihPehar++;
            } else {
                brojKontektovanihPehar = 0;
                Pehar.count().exec(function (err, count) {
                    var random = Math.floor(Math.random() * count);
                    Pehar.findOne().skip(random).exec(function (err, p) {
                        niz = Array();
                        niz.push({ pitanje: p.gore9.pitanje, odgovor: p.gore9.odgovor });
                        niz.push({ pitanje: p.gore8.pitanje, odgovor: p.gore8.odgovor });
                        niz.push({ pitanje: p.gore7.pitanje, odgovor: p.gore7.odgovor });
                        niz.push({ pitanje: p.gore6.pitanje, odgovor: p.gore6.odgovor });
                        niz.push({ pitanje: p.gore5.pitanje, odgovor: p.gore5.odgovor });
                        niz.push({ pitanje: p.gore4.pitanje, odgovor: p.gore4.odgovor });
                        niz.push({ pitanje: p.goredole3.pitanje, odgovor: p.goredole3.odgovor });
                        niz.push({ pitanje: p.dole4.pitanje, odgovor: p.dole4.odgovor });
                        niz.push({ pitanje: p.dole5.pitanje, odgovor: p.dole5.odgovor });
                        niz.push({ pitanje: p.dole6.pitanje, odgovor: p.dole6.odgovor });
                        niz.push({ pitanje: p.dole7.pitanje, odgovor: p.dole7.odgovor });
                        niz.push({ pitanje: p.dole8.pitanje, odgovor: p.dole8.odgovor });
                        niz.push({ pitanje: p.dole9.pitanje, odgovor: p.dole9.odgovor });

                        for (var prop in socket.rooms) {
                            if (prop.substr(0, 4) == "soba") {
                                io.to(prop).emit("pehar/vracamPehar", { pehar: niz, naRedu: naReduPehar });
                            }
                        }
                        naReduPehar = "crveni";
                    });
                });

            }
        });



        socket.on('pehar/zavrsioPehar', function (data) {
            naReduPehar = "plavi";

            if (brojKontektovanihPehar == 0) {
                brojKontektovanihPehar++;
            } else {
                brojKontektovanihPehar = 0;
                for (var prop in socket.rooms) {
                    if (prop.substr(0, 4) == "soba") {
                        io.to(prop).emit("pehar/mozesDaljePehar");
                    }
                }

            }
        });


        //////////////////////////////geografija////////////////////////////////////


        socket.on('geografija/vratiSlovo', function (data) {
            if (brojKontektovanihMojBroj == 0) brojKontektovanihMojBroj++; else {
                brojKontektovanihMojBroj = 0;
                var azbuka = ['a', 'b', 'v', 'g', 'd', 'đ', 'e', 'ž', 'z', 'i', 'j', 'k', 'l', 'lj', 'm', 'n', 'nj', 'o', 'p', 'r', 's', 't', 'ć', 'u', 'f', 'h', 'c', 'č', 'dž', 'š'];
                var random = azbuka[Math.floor((Math.random() * 30) % 30)];

                for (var prop in socket.rooms) {
                    if (prop.substr(0, 4) == "soba") {
                        io.to(prop).emit("geografija/pocetnoSlovo", { slovo: random, naRedu: naReduMojBroj });
                    }
                }
                naReduMojBroj = "crveni";

            }
        });



        socket.on('geografija/dajSansuDrugom', function (data) {
            for (var prop in socket.rooms) {
                if (prop.substr(0, 4) == "soba") {
                    io.to(prop).emit("geografija/dobijamSansu", { unetiPojmovi: data.unetiPojmovi });
                }
            }
        });


        socket.on('geografija/javljamDaSamZavrsio', function (data) {
            for (var prop in socket.rooms) {
                if (prop.substr(0, 4) == "soba") {
                    io.to(prop).emit("geografija/zavrsio");
                }
            }
        });


        socket.on('geografija/zavrsioGeografiju', function (data) {
            naReduMojBroj = "plavi";

            if (brojKontektovanihMojBroj == 0) {
                brojKontektovanihMojBroj++;
            } else {
                brojKontektovanihMojBroj = 0;
                for (var prop in socket.rooms) {
                    if (prop.substr(0, 4) == "soba") {
                        io.to(prop).emit("geografija/mozesDaljeGeografija");
                    }
                }

            }
        });


    });
}

