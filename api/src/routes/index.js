const { Router, static } = require('express');
const { getPokemons, getPokemonId, createNewPokemon, getTypes } = require('./controllers.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', getPokemons);
router.get('/pokemons/:id', getPokemonId);
router.post('/pokemon', createNewPokemon);
router.get('/type', getTypes);

module.exports = router;
