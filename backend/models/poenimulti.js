const mongoose = require('mongoose');

const poeniSchema = mongoose.Schema({

    poeniAnagram: { type: String },
    poeniMojbroj: { type: String },
    poeniVesala: { type: String },
    poeniGeografija: { type: String },
    poeniPehar: { type: String },
    poeniUkupno: { type: String },
    takmicar : {type: String}

});



const poenimultiSchema = mongoose.Schema({

    plavi: { type: poeniSchema },
    crveni: { type: poeniSchema },
    datum : {type: Date}
});

module.exports = mongoose.model('Poenimulti', poenimultiSchema);
