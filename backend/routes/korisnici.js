const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Korisnikk = require("../models/korisnikk");

const checkAuth = require("../middleware/check-auth-admin");


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
            tajanstvenoPitanje: req.body.tajanstvenoPitanje,
            tajanstveniOdgovor: req.body.tajanstveniOdgovor
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
                {korime: fetchedUser.korime,
                tipKorisnika: fetchedUser.tip},
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

router.post("/odbijZahtev", (req,res,next)=>{
    Korisnikk.deleteOne({korime: req.body.korime})
        .then(korisnik => {
            return res.status(200).json({message: "Odbijen zahtev korisniku: " + korisnik.korime })
        })
});

router.post("/promenaLozinke", (req,res,next) => {
    bcrypt.hash(req.body.novaLozinka, 10).then(hash => {
        let fetchedUser;
        Korisnikk.findOne({korime: req.body.korime})
        .then(korisnik => {
 
            if (!korisnik.valid) {
                return res.status(401).json({
                    message: "Ceka se odobrenje administratora za vasu registraciju."
                });
            }

            fetchedUser = korisnik;
            return bcrypt.compare(req.body.staraLozinka, korisnik.lozinka);
        })
        .then(result => {
            if(!result) {
                return res.status(401).json({
                    message: "Neispravna lozinka. Da niste zaboravili?"
                });
            }

            Korisnikk.updateOne({ korime : req.body.korime}, {lozinka : hash})
            .then(korisnik => {
                return res.status(200).json({message: "Uspesno promenjena lozinka."});
            })
            .catch(err=>{
                return res.status(401).json({message:"Neuspela promena lozinke"});
            });
        
    

        })
        .catch(err => {
            return res.status(401).json({message:"Neuspela promena lozinke"});
        });
    });
});


router.post("/promenaLozinke/jmbg", (req,res,next) => {
    Korisnikk.findOne({korime: req.body.korime, jmbg: req.body.jmbg})
        .then(korisnik =>{
            if (!korisnik) {
                return res.status(401).json({
                    message: "Ne postoji korisnik sa datim korisnickim imenom i JMBG."
                });
            }
            res.status(200).json({
                pitanje: korisnik.tajanstvenoPitanje,
                odgovor: korisnik.tajanstveniOdgovor,
                korime: korisnik.korime
            });

        })
        .catch(err => {
            return res.status(401).json({message:"Neuspeo zahtev."});
        })   
});


router.post("/promenaZaboravljeneLozinke", (req,res,next) => {
    bcrypt.hash(req.body.novaLozinka, 10).then(hash => {
        Korisnikk.updateOne({ korime : req.body.korime}, {lozinka : hash})
        .then(korisnik => {
            return res.status(200).json({message: "Uspesno promenjena zaboravljena lozinka"});
        }) 
    });
});

router.post("/unaprediUSupervizora", checkAuth, (req,res,next) => {
    Korisnikk.updateOne({ korime : req.body.korime}, {tip : "Supervizor"})
        .then(korisnik => {
            console.log(req.body.korime);
            return res.status(200).json({korime: req.body.korime, korisnik: korisnik, message: "Takmicar uspesno postao supervizor kviza."});
        })
});


router.get("/takmicari", checkAuth, (req,res,next) => {
    Korisnikk.find({valid : true, tip : "Takmicar"})
        .then( takmicari => {
            res.status(200).json({
                message: "Uspesno dohvatanje liste takmicara.",
                takmicari: takmicari
              });
        })


});


module.exports = router;