const mongoose = require('mongoose');

const anagramSchema = mongoose.Schema({

    zagonetka : {type: String },
    resenje : {type: String}
    
});

module.exports = mongoose.model('Anagram', anagramSchema);
