const mongoose = require('mongoose');

const vesalaSchema = mongoose.Schema({

    rec : {type: String },
    
});

module.exports = mongoose.model('Vesala', vesalaSchema);
