const mongoose = require('mongoose');



const geografijaSchema = mongoose.Schema({

    slovo : {type: String},
    kategorija : {type: String},
    termin: {type: String}
    
});

module.exports = mongoose.model('Geografija', geografijaSchema);
