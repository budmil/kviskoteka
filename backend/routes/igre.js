const express = require("express");

const Anagram = require("../models/anagram");
const Pehar = require ("../models/pehar");

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






module.exports = router;