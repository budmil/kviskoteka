const mongoose = require('mongoose');

const rebusSchema = mongoose.Schema({

    linkDoSlike: { type: String },
    resenje: { type: String }
});

module.exports = mongoose.model('Rebus', rebusSchema);
