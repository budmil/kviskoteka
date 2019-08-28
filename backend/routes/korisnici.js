const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Korisnikk = require("../models/korisnikk");

const router = express.Router();

router.post("/signup", (req,res,next) => {
    bcrypt.hash(req.body.lozinka, 10).then(hash => {

        const korisnik = new Korisnikk({
            ime: req.body.ime,
            prezime: req.body.prezime,
            zanimanje: req.body.zanimanje,
            email: req.body.email,
            korime: req.body.korime,
            lozinka: hash,
            pol: req.body.pol,
            jmbg: req.body.jmbg,
            tip: "Takmicar"
        });
        korisnik.save()
        .then(result => {
            res.status(201).json({
                message: "Zahtev za registraciju uspesno predat administratoru"
            });
        })
        .catch(err => {
            res.status(500).json({
              error: err
            });
        });
    });
});-

router.post("/login",(req,res,next)=>{
    let fetchedUser;
    Korisnikk.findOne({korime: req.body.korime})
        .then(korisnik => {
            if (!korisnik) {
              return res.status(401).json({
                  message: "Ne postoji korisnik sa datim korisnickim imenom"
              });
            }
            fetchedUser = korisnik;
            return bcrypt.compare(req.body.lozinka, korisnik.lozinka);
        })
        .then(result => {
            if(!result) {
                return res.status(401).json({
                    message: "Neispravna lozinka"
                });
            }
            const token = jwt.sign(
                {korime: fetchedUser.korime},
                "tajni_kljuc_vau_vau_ne_mozes_me_provaliti",
                {expiresIn: "1h"}
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                tip: fetchedUser.tip
            });

        })
        .catch(err => {
            return res.status(401).json({message:"Neuspelo logovanje"});
        });

});


router.get("/email", (req,res,next) => {
    Korisnikk.findOne({ email : req.query.email }, 'email')
        .then(email => {

            if (!email) { 
                return res.status(200).json({imaMejla: false});
                  //nema email
            }
            return res.status(200).json({imaMejla: true}); //ima email
        })


});


module.exports = router;