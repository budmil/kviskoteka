const express = require("express");
const router = express.Router();
const Poeni = require("../models/poeni");

router.get("/igraoDanas", (req,res,next) => {
    Poeni.findOne({ takmicar : req.query.korime, datum : new Date().toDateString()})
        .then(poeni => {
            if (!poeni) { 
                return res.status(200).json({igraoDanas: false});
            }
            return res.status(200).json({igraoDanas: true}); 
        })
});


router.get("/rangDanas", (req,res,next) => {
    Poeni.find({datum : new Date().toDateString()}).sort("-poeniUkupno")
        .then(poeni => {
            if (!poeni) { 
                return res.status(200).json({rangTabelaDanas: null});
            }
            return res.status(200).json({rangTabelaDanas: poeni}); 
        })
});



module.exports = router;