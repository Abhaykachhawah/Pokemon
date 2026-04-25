const express = require('express');
const router = express.Router();
const { 
    createPokemon, 
    getAllPokemons, 
    getPokemonById, 
    deletePokemonById, 
    updatePokemon 
} = require('../Controllers/PokemonController');

router.get('/', getAllPokemons);
router.post('/', createPokemon);
router.put('/:id', updatePokemon);
router.get('/:id', getPokemonById);
router.delete('/:id', deletePokemonById);

module.exports = router;
