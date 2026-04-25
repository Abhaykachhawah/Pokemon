const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    breed: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: 'Normal' },
    image: { type: String },
}, { timestamps: true });

const Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;
