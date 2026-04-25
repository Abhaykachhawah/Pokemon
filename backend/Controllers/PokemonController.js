const Pokemon = require('../Models/PokemonModel');

// Create a Pokemon
const createPokemon = async (req, res) => {
    try {
        const body = req.body;
        if (req.file) {
            body.image = req.file.path;
        }
        const newPokemon = new Pokemon(body);
        await newPokemon.save();
        res.status(201).json({ message: 'Saved!', pokemon: newPokemon });
    } catch (err) {
        res.status(500).json({ message: 'Error saving pokemon', error: err });
    }
};

// Get all Pokemons
const getAllPokemons = async (req, res) => {
    try {
        const list = await Pokemon.find();
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pokemons' });
    }
};

// Get single Pokemon
const getPokemonById = async (req, res) => {
    try {
        const data = await Pokemon.findById(req.params.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Error' });
    }
};

// Update Pokemon
const updatePokemon = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        if (req.file) {
            updateData.image = req.file.path;
        }
        const updated = await Pokemon.findByIdAndUpdate(id, updateData, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Error updating' });
    }
};

// Delete Pokemon
const deletePokemonById = async (req, res) => {
    try {
        await Pokemon.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting' });
    }
};

module.exports = {
    createPokemon,
    getAllPokemons,
    getPokemonById,
    updatePokemon,
    deletePokemonById
};
