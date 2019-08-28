const mongoose = require('mongoose');

const korisnikkSchema = mongoose.Schema({

    ime : {type: String },
    prezime : {type: String},
    email : {type: String },
    korime : {type: String , required: "Obavezno polje"},
    lozinka : {type: String },
    zanimanje : {type: String },
    pol : {type: String },
    jmbg : {type: String },
    tip : {type: String, enum: ['Takmicar', 'Supervizor', 'Admin']}
});

module.exports = mongoose.model('Korisnikk', korisnikkSchema);
