const mongoose = require('mongoose');



const igradanaSchema = mongoose.Schema({

    vesala : {type: mongoose.Schema.Types.ObjectId},
    pehar : {type: mongoose.Schema.Types.ObjectId},
    anagram: {type: mongoose.Schema.Types.ObjectId},
    rebus: { type: mongoose.Schema.Types.ObjectId},
    datum: { type: String },
    anagramilirebus: {type: String}
    
});

module.exports = mongoose.model('Igradana', igradanaSchema);
