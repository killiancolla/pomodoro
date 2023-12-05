const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    mdp: { type: String, required: true },
    favTheme: { type: String, default: null, required: false },
    favLanguage: { type: String, default: 'en', required: true },
    nbCycle: { type: Number, default: 0 },
    totalTime: { type: Number, default: 0 },
    studyStats: [{
        date: Date,
        timeStudied: Number
    }]
});

module.exports = mongoose.model('User', UserSchema);