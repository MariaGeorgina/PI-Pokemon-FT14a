const { Router, static } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/get/pokemons', require('./pokemonRoutes.js'))
router.use('/post/pokemons', require('./pokemonRoutes.js'))
router.use('/get/types', require ('./typesRoutes.js'))
module.exports = router;
