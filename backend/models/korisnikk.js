const mongoose = require('mongoose');

const korisnikkSchema = mongoose.Schema({

    ime : {type: String },
    prezime : {type: String},
    email : {type: String, unique : true},
    korime : {type: String , unique : true, required: "Obavezno polje"},
    lozinka : {type: String },
    zanimanje : {type: String },
    pol : {type: String },
    jmbg : {type: String},
    tip : {type: String, enum: ['Takmicar', 'Supervizor', 'Admin']},
    linkDoSlike: {type: String},
    valid : {type: Boolean},  //1 valid, 0 ceka se odobrenje administratora
    tajanstvenoPitanje : {type: String},
    tajanstveniOdgovor: {type: String}
});

module.exports = mongoose.model('Korisnikk', korisnikkSchema);
