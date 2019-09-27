const express = require("express");
const router = express.Router();
const Poeni = require("../models/poeni");
const Poenimulti = require("../models/poenimulti");

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
                return res.status(200).json({ rangTabelaDanas: new Array() });
            }
            return res.status(200).json({ rangTabelaDanas: poeni });
        })
});


router.post("/rangMulti", (req, res, next) => {
    Poenimulti.find({
        datum: {
            $lt: new Date(),
            $gte: new Date(new Date().setDate(new Date().getDate() - 7))
        }
    }).sort("-datum")
        .then(poeni => {
            var rangMultiTabela = new Array();
            poeni.forEach(element => {
                if (element.crveni.takmicar == req.body.korime || element.plavi.takmicar == req.body.korime) {
                    var protivnik;
                    var poeniJa;
                    var poeniProtivnik;
                    if (element.crveni.takmicar == req.body.korime) {
                        protivnik = element.plavi.takmicar;
                        poeniJa = element.crveni.poeniUkupno;
                        poeniProtivnik = element.plavi.poeniUkupno;
                    } else {
                        protivnik = element.crveni.takmicar;
                        poeniJa = element.plavi.poeniUkupno;
                        poeniProtivnik = element.crveni.poeniUkupno;
                    }

                    var pom = {
                        datum:element.datum.toDateString(),
                        protivnik:protivnik,
                        poeniJa:poeniJa,
                        poeniProtivnik:poeniProtivnik
                    }
                    rangMultiTabela.push(pom);
                }
            });
            return res.status(200).json({ rangTabelaMulti: rangMultiTabela });
        })
});


router.get("/najbolji30", (req, res, next) => {

    var danas = new Date();
    var pocetakMeseca = new Date();
    pocetakMeseca.setMonth(danas.getMonth());
    pocetakMeseca.setDate(1);
    Poeni.find({
        datum: {
            $gte: pocetakMeseca,
            $lt: danas
        }
    }).sort("-poeniUkupno")
        .then(poeni => {
            if (!poeni) {
                return res.status(200).json({ najbolji30: new Array() });
            }
            return res.status(200).json({ najbolji30: poeni });
        })
});



router.get("/najbolji20", (req, res, next) => {

    Poeni.find({
        datum: {
            $lt: new Date(),
            $gte: new Date(new Date().setDate(new Date().getDate() - 20))
        }
    }).sort("-poeniUkupno")
        .then(poeni => {
            if (!poeni) {
                return res.status(200).json({ najbolji20: new Array() });
            }
            return res.status(200).json({ najbolji20: poeni });
        })
});



module.exports = router;