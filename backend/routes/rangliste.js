const express = require("express");
const router = express.Router();
const Poeni = require("../models/poeni");

router.get("/igraoDanas", (req, res, next) => {
    Poeni.findOne({
        takmicar: req.query.korime, datum: {
            $gte: new Date(new Date().setHours(00, 00, 00)),
            $lt: new Date(new Date().setHours(23, 59, 59))
        }
    })
        .then(poeni => {
            if (!poeni) {
                return res.status(200).json({ igraoDanas: false });
            }
            return res.status(200).json({ igraoDanas: true });
        })
});


router.get("/rangDanas", (req, res, next) => {
    Poeni.find({
        datum: {
            $gte: new Date(new Date().setHours(00, 00, 00)),
            $lt: new Date(new Date().setHours(23, 59, 59))
        }
    }).sort("-poeniUkupno")
        .then(poeni => {
            if (!poeni) {
                return res.status(200).json({ rangTabelaDanas: null });
            }
            return res.status(200).json({ rangTabelaDanas: poeni });
        })
});



router.get("/najbolji30", (req, res, next) => {

    var danas = new Date();
    var pocetakMeseca = new Date();
    pocetakMeseca.setMonth(danas.getMonth());
    pocetakMeseca.setDate(1);
    Poeni.find({ datum: {
        $gte: pocetakMeseca,
        $lt: danas
    } }).sort("-poeniUkupno")
        .then(poeni => {
            if (!poeni) {
                return res.status(200).json({ najbolji30: new Array() });
            }
            return res.status(200).json({ najbolji30: poeni });
        })
});



router.get("/najbolji20", (req, res, next) => {

    Poeni.find({ datum: {
        $lt: new Date(), 
        $gte: new Date(new Date().setDate(new Date().getDate()-20))
    } }).sort("-poeniUkupno")
        .then(poeni => {
            if (!poeni) {
                return res.status(200).json({ najbolji20: new Array() });
            }
            return res.status(200).json({ najbolji20: poeni });
        })
});



module.exports = router;