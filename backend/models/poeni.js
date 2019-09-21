const mongoose = require('mongoose');

const poeniSchema = mongoose.Schema({

    poeniAnagram: { type: String },
    poeniMojbroj: { type: String },
    poeniVesala: { type: String },
    poeniGeografija: { type: String },
    poeniPehar: { type: String },
    poeniUkupno: { type: String },
    datum: { type: Date },
    takmicar : {type: String}

});

module.exports = mongoose.model('Poeni', poeniSchema);
