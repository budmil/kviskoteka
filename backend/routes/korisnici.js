const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Korisnikk = require("../models/korisnikk");

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Nije dobar tip fajla!");
        if (isValid) {
            error = null;
        }
        cb(error,"backend/profilneSlike");
    },
    filename: (req, file, cb) => {
        const ime = file.originalname.toLowerCase().split(' ').join('-');
        const ekstenzija = MIME_TYPE_MAP[file.mimetype];
        cb(null,ime+'.'+ekstenzija);
    }
});

router.post("/signup", multer({storage: storage}).single("profilnaSlika"), (req,res,next) => {
    bcrypt.hash(req.body.lozinka, 10).then(hash => {
        const url = req.protocol + '://' + req.get("host");
        const korisnik = new Korisnikk({
            ime: req.body.ime,
            prezime: req.body.prezime,
            zanimanje: req.body.zanimanje,
            email: req.body.email,
            korime: req.body.korime,
            lozinka: hash,
            pol: req.body.pol,
            jmbg: req.body.jmbg,
            tip: "Takmicar",
            linkDoSlike: url + "/profilneSlike/" + req.file.filename,
            valid: false,

        });
        console.log(korisnik);
        korisnik.save()
        .then(result => {
            console.log('usao');
            res.status(201).json({
                message: "Zahtev za registraciju uspesno predat administratoru"
            });
        })
        .catch(err => {
            console.log(err);

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
                  message: "Ne postoji korisnik sa datim korisnickim imenom."
              });
            }

            if (!korisnik.valid) {
                return res.status(401).json({
                    message: "Ceka se odobrenje administratora za vasu registraciju."
                });
            }

            fetchedUser = korisnik;
            return bcrypt.compare(req.body.lozinka, korisnik.lozinka);
        })
        .then(result => {
            if(!result) {
                return res.status(401).json({
                    message: "Neispravna lozinka."
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

router.get("/korime", (req,res,next) => {
    Korisnikk.findOne({ korime : req.query.korime}, 'korime')
        .then(korime => {

            if (!korime) { 
                return res.status(200).json({imaKorime: false});
                  //nema korime
            }
            return res.status(200).json({imaKorime: true}); //ima vec ovo korisnicko ime
        })
});

router.get("/zahtevi", (req,res,next) => {
    Korisnikk.find({valid : false})
        .then(zahtevi => {
            res.status(200).json({
                message: "Uspesno dohvatanje zahteva za registrovanje.",
                zahtevi: zahtevi
              });
        })


});


router.post("/odobriZahtev", (req,res,next) => {
    Korisnikk.updateOne({ korime : req.body.korime}, {valid : true})
        .then(korisnik => {
            return res.status(200).json({message: "Takmicar uspesno postao ucesnik kviza."});
        })
});


module.exports = router;