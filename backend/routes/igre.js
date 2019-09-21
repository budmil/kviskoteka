const express = require("express");
const multer = require("multer");

const Anagram = require("../models/anagram");
const Pehar = require("../models/pehar");
const Geografija = require("../models/geografija");
const Vesala = require("../models/vesala");
const Igradana = require("../models/igradana");
const Rebus = require("../models/rebus");
const Poeni = require("../models/poeni");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb("", "backend/rebusi");
    },
    filename: (req, file, cb) => {
        const ime = file.originalname.toLowerCase().split(' ').join('-');
        const ekstenzija = MIME_TYPE_MAP[file.mimetype];
        cb(null, ime + '.' + ekstenzija);
    }
});


router.post("/anagram/dodajAnagram", (req, res, next) => {
    const anagram = new Anagram({
        zagonetka: req.body.zagonetka,
        resenje: req.body.resenje
    });
    anagram.save()
        .then(result => {
            res.status(201).json({
                message: "Uspesno dodat anagram u bazu."
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get("/anagram/dohvati", (req, res, next) => {
    Anagram.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);
        Anagram.findOne().skip(random).exec(function (err, anagram) {
            res.status(201).json({
                zagonetka: anagram.zagonetka,
                resenje: anagram.resenje
            });
        });
    });
});



router.post("/rebus/dodajRebus", multer({ storage: storage }).single("slika"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");

    const rebus = new Rebus({
        linkDoSlike: url + "/rebusi/" + req.file.filename,
        resenje: req.body.resenje
    });
    rebus.save()
        .then(result => {
            res.status(201).json({
                message: "Uspesno dodat rebus u bazu."
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.post("/pehar/dodajPehar", (req, res, next) => {
    console.log(req.body);
    const pehar = new Pehar({
        gore9: req.body.gore9,
        gore8: req.body.gore8,
        gore7: req.body.gore7,
        gore6: req.body.gore6,
        gore5: req.body.gore5,
        gore4: req.body.gore4,
        goredole3: req.body.goredole3,
        dole4: req.body.dole4,
        dole5: req.body.dole5,
        dole6: req.body.dole6,
        dole7: req.body.dole7,
        dole8: req.body.dole8,
        dole9: req.body.dole9
    });
    pehar.save()
        .then(result => {
            res.status(201).json({
                message: "Uspesno dodat pehar u bazu."
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});



router.get("/pehar/dohvatiPehar", (req, res, next) => {

    Pehar.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);
        Pehar.findOne().skip(random).exec(function (err, pehar) {
            niz = Array();
            niz.push({ pitanje: pehar.gore9.pitanje, odgovor: pehar.gore9.odgovor });
            niz.push({ pitanje: pehar.gore8.pitanje, odgovor: pehar.gore8.odgovor });
            niz.push({ pitanje: pehar.gore7.pitanje, odgovor: pehar.gore7.odgovor });
            niz.push({ pitanje: pehar.gore6.pitanje, odgovor: pehar.gore6.odgovor });
            niz.push({ pitanje: pehar.gore5.pitanje, odgovor: pehar.gore5.odgovor });
            niz.push({ pitanje: pehar.gore4.pitanje, odgovor: pehar.gore4.odgovor });
            niz.push({ pitanje: pehar.goredole3.pitanje, odgovor: pehar.goredole3.odgovor });
            niz.push({ pitanje: pehar.dole4.pitanje, odgovor: pehar.dole4.odgovor });
            niz.push({ pitanje: pehar.dole5.pitanje, odgovor: pehar.dole5.odgovor });
            niz.push({ pitanje: pehar.dole6.pitanje, odgovor: pehar.dole6.odgovor });
            niz.push({ pitanje: pehar.dole7.pitanje, odgovor: pehar.dole7.odgovor });
            niz.push({ pitanje: pehar.dole8.pitanje, odgovor: pehar.dole8.odgovor });
            niz.push({ pitanje: pehar.dole9.pitanje, odgovor: pehar.dole9.odgovor });

            res.status(201).json({
                pehar: niz
            });
        });
    });
});


router.post("/geografija/proveriPojam", (req, res, next) => {

    Geografija.findOne({ slovo: req.body.slovo, kategorija: req.body.kategorija, termin: req.body.termin })

        .then(result => {
            if (result) res.status(201).json({ imaUBazi: true }); else res.status(201).json({ imaUBazi: false });
        })
        .catch(err => {
            res.status(500).json({
                message: "Doslo je do greske pri radu sa serverom."
            });
        });
});




router.get("/vesala/dohvati", (req, res, next) => {
    Vesala.countDocuments().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);
        Vesala.findOne().skip(random).exec(function (err, vesalo) {
            res.status(201).json({
                rec: vesalo.rec
            });
        });
    });
});


router.get("/admin/dovuciVesala", (req, res, next) => {
    Vesala.find().then(reci => {
        res.status(201).json({
            reci: reci
        });
    });
});

router.get("/admin/dovuciPehare", (req, res, next) => {
    Pehar.find().then(pehari => {
        res.status(201).json({
            pehari: pehari
        });
    });
});

router.get("/admin/dovuciAnagrame", (req, res, next) => {
    Anagram.find().then(anagrami => {
        res.status(201).json({
            anagrami: anagrami
        });
    });
});

router.get("/admin/dovuciRebuse", (req, res, next) => {
    Rebus.find().then(rebusi => {
        res.status(201).json({
            rebusi: rebusi
        });
    });
});

router.post("/admin/igraDana", (req, res, next) => {
    var igradana = new Igradana({
        vesala: req.body.vesala,
        pehar: req.body.pehar,
        anagram: req.body.anagram,
        rebus: req.body.rebus,
        datum: req.body.datum,
        anagramilirebus: req.body.anagramilirebus
    });
    igradana.save()
        .then(result => {
            res.status(201).json({
                message: "Uspesno dodata igra dana"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});




router.get("/igradana/dohvatiIgruDana", (req, res, next) => {
    Igradana.findOne({ datum: new Date().toDateString() })
        .then(igrica => {
            console.log("igra dana: ");
            console.log(igrica);
            res.status(201).json({
                igraDana: igrica
            })
        });
});



router.post("/igradana/dohvatiPehar", (req, res, next) => {

    Pehar.findOne({ _id: req.body.peharId })
        .then(pehar => {

            niz = Array();
            niz.push({ pitanje: pehar.gore9.pitanje, odgovor: pehar.gore9.odgovor });
            niz.push({ pitanje: pehar.gore8.pitanje, odgovor: pehar.gore8.odgovor });
            niz.push({ pitanje: pehar.gore7.pitanje, odgovor: pehar.gore7.odgovor });
            niz.push({ pitanje: pehar.gore6.pitanje, odgovor: pehar.gore6.odgovor });
            niz.push({ pitanje: pehar.gore5.pitanje, odgovor: pehar.gore5.odgovor });
            niz.push({ pitanje: pehar.gore4.pitanje, odgovor: pehar.gore4.odgovor });
            niz.push({ pitanje: pehar.goredole3.pitanje, odgovor: pehar.goredole3.odgovor });
            niz.push({ pitanje: pehar.dole4.pitanje, odgovor: pehar.dole4.odgovor });
            niz.push({ pitanje: pehar.dole5.pitanje, odgovor: pehar.dole5.odgovor });
            niz.push({ pitanje: pehar.dole6.pitanje, odgovor: pehar.dole6.odgovor });
            niz.push({ pitanje: pehar.dole7.pitanje, odgovor: pehar.dole7.odgovor });
            niz.push({ pitanje: pehar.dole8.pitanje, odgovor: pehar.dole8.odgovor });
            niz.push({ pitanje: pehar.dole9.pitanje, odgovor: pehar.dole9.odgovor });

            res.status(201).json({
                pehar: niz
            });

        });

});


router.post("/igradana/dohvatiVesalo", (req, res, next) => {

    Vesala.findOne({ _id: req.body.vesaloId })
        .then(vesalo => {
            res.status(201).json({
                rec: vesalo.rec
            });

        });

});



router.post("/igradana/dohvatiAnagram", (req, res, next) => {

    Anagram.findOne({ _id: req.body.anagramId })
        .then(anagram => {
            res.status(201).json({
                zagonetka: anagram.zagonetka,
                resenje: anagram.resenje
            });

        });

});



router.post("/igradana/dohvatiRebus", (req, res, next) => {

    Rebus.findOne({ _id: req.body.rebusId })
        .then(rebus => {
            res.status(201).json({
                zagonetka: rebus.linkDoSlike,
                resenje: rebus.resenje
            });

        });

});

router.post("/igradana/poeni", (req, res, next) => {
    var poeni = new Poeni({
        poeniAnagram: req.body.poeniAnagram,
        poeniMojbroj: req.body.poeniMojbroj,
        poeniVesala: req.body.poeniVesala,
        poeniGeografija: req.body.poeniGeografija,
        poeniPehar: req.body.poeniPehar,
        poeniUkupno: req.body.poeniUkupno,
        datum: new Date(),
        takmicar: req.body.takmicar
    });
    poeni.save()
        .then(result => {
            res.status(201).json({
                message: "Uspesno sacuvani poeni igre dana"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});



router.get("/admin/nekoDanasIgrao", (req, res, next) => {
    Poeni.findOne({
        datum: {
            $gte: new Date(new Date().setHours(00, 00, 00)),
            $lt: new Date(new Date().setHours(23, 59, 59))
        }
    })
        .then(poeni => {

            if (!poeni) {
                res.status(201).json({
                    nekoDanasIgrao: false
                });
            } else {

                res.status(201).json({
                    nekoDanasIgrao: true
                })
            }
        });
});



router.post("/admin/dovuciIgruDana", (req, res, next) => {
    Igradana.findOne({ datum: req.body.datum })
        .then(igradana => {
            if (!igradana) {
                res.status(201).json({
                    igradana: null
                });
            } else {

                res.status(201).json({
                    igradana: igradana
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});




router.post("/admin/azurirajIgruDana", (req, res, next) => {
    Igradana.updateOne({ datum: req.body.datum }, {
        vesala: req.body.vesala,
        pehar: req.body.pehar,
        anagram: req.body.anagram,
        rebus: req.body.rebus, anagramilirebus: req.body.anagramilirebus
    })
        .then(result => {
            res.status(201).json({
                message: "Uspesno azurirana igra dana za " + req.body.datum
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});


module.exports = router;