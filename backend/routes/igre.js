const express = require("express");

const Anagram = require("../models/anagram");
const Pehar = require ("../models/pehar");
const Geografija = require("../models/geografija");

const router = express.Router();


router.post("/anagram/dodajAnagram", (req,res,next) => {
    console.log
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
            error : err
        });
    });
});

router.get("/anagram/dohvati", (req,res,next) => {
    Anagram.count().exec(function(err,count) {
        var random = Math.floor(Math.random() * count);
        Anagram.findOne().skip(random).exec(function(err,anagram) {
            res.status(201).json({
                zagonetka: anagram.zagonetka,
                resenje : anagram.resenje
            });
        });
    });
});


router.post("/pehar/dodajPehar", (req,res,next) => {
    console.log(req.body);
    const pehar = new Pehar({
        gore9 : req.body.gore9,
        gore8 : req.body.gore8,
        gore7 : req.body.gore7,
        gore6 : req.body.gore6,
        gore5 : req.body.gore5,
        gore4 : req.body.gore4,
        goredole3 : req.body.goredole3,
        dole4 : req.body.dole4,
        dole5 : req.body.dole5,
        dole6 : req.body.dole6,
        dole7 : req.body.dole7,
        dole8 : req.body.dole8,
        dole9 : req.body.dole9
    });
    pehar.save()
    .then(result => {
        res.status(201).json({
            message: "Uspesno dodat pehar u bazu."
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
});



router.get("/pehar/dohvatiPehar", (req,res,next) => {

    Pehar.count().exec(function(err,count) {
        var random = Math.floor(Math.random() * count);
        Pehar.findOne().skip(random).exec(function(err,pehar) {
            niz = Array();
            niz.push({pitanje: pehar.gore9.pitanje, odgovor: pehar.gore9.odgovor});
            niz.push({pitanje: pehar.gore8.pitanje, odgovor: pehar.gore8.odgovor});
            niz.push({pitanje: pehar.gore7.pitanje, odgovor: pehar.gore7.odgovor});
            niz.push({pitanje: pehar.gore6.pitanje, odgovor: pehar.gore6.odgovor});
            niz.push({pitanje: pehar.gore5.pitanje, odgovor: pehar.gore5.odgovor});
            niz.push({pitanje: pehar.gore4.pitanje, odgovor: pehar.gore4.odgovor});
            niz.push({pitanje: pehar.goredole3.pitanje, odgovor: pehar.goredole3.odgovor});
            niz.push({pitanje: pehar.dole4.pitanje, odgovor: pehar.dole4.odgovor});
            niz.push({pitanje: pehar.dole5.pitanje, odgovor: pehar.dole5.odgovor});
            niz.push({pitanje: pehar.dole6.pitanje, odgovor: pehar.dole6.odgovor});
            niz.push({pitanje: pehar.dole7.pitanje, odgovor: pehar.dole7.odgovor});
            niz.push({pitanje: pehar.dole8.pitanje, odgovor: pehar.dole8.odgovor});
            niz.push({pitanje: pehar.dole9.pitanje, odgovor: pehar.dole9.odgovor});

            res.status(201).json({
                pehar: niz
            });
        });
    });
});


router.post("/geografija/proveriPojam", (req,res,next) => {
  
    Geografija.findOne({slovo: req.body.slovo, kategorija: req.body.kategorija, termin: req.body.termin})

    .then(result => {
        if (result)  res.status(201).json({ imaUBazi : true }); else res.status(201).json({ imaUBazi : false });
    })
    .catch(err => {
        res.status(500).json({
            message : "Doslo je do greske pri radu sa serverom."
        });
    });
});






module.exports = router;