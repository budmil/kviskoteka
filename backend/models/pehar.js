const mongoose = require('mongoose');

const pitanjeodgovor = mongoose.Schema({

     pitanje: {type: String},
     odgovor: {type: String}
    
});


const peharSchema = mongoose.Schema({

    gore9 : {type: pitanjeodgovor},
    gore8 : {type: pitanjeodgovor},
    gore7 : {type: pitanjeodgovor},
    gore6 : {type: pitanjeodgovor},
    gore5 : {type: pitanjeodgovor},
    gore4 : {type: pitanjeodgovor},
    goredole3 : {type: pitanjeodgovor},
    dole4 : {type: pitanjeodgovor},
    dole5 : {type: pitanjeodgovor},
    dole6 : {type: pitanjeodgovor},
    dole7 : {type: pitanjeodgovor},
    dole8 : {type: pitanjeodgovor},
    dole9 : {type: pitanjeodgovor},
    
});

module.exports = mongoose.model('Pehar', peharSchema);
