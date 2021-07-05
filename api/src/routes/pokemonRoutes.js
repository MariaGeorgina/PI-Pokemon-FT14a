const server = require ('express').Router();
const { Pokemon, Type } = require ('./../db');

server.get ('/', async function (req, res) {
try {
  const figures = await Pokemon.findAll({
      attributes : [
          'name',
          'id',
          'life',
          'strength', 
          'defense',
          'speed',
          'height',
          'weight'
      ],
      include: [{ model: Type }]
  });
  res.status(200).json(figures)
} catch (error) {
    res.send(error)
}
})
server.get('/:id', async function (req, res) {
    const { id } = req.params;
    try {
        let pikachu = await Pokemon.findOne({
            where: { id: id },
            include: [{ model: Type }]
        });
        res.status(200).json(pikachu)
    } catch (error) {
        res.send(error)
    }
})
server.get('/quest', async function (req, res) {
    const { name } = req.query;
    try {
        let bulbasaur = await Pokemon.findOne({
            where: { name },
            include: [{ model: Type }],
        })
        res.status(200).json(bulbasaur)
    } catch (error) {
        res.send(error)
    }
})
server.post('/', async function (req, res) {
    const {// me traigo los attributes de un pokemon
        name,
        life,
        strength,
        defense,
        speed, 
        height,
        weight,
        type
    } = req.body;
    try {
        const pokemonsProduction = await Pokemon.create({// creo values para los attributes
            name: name,
            life: life,
            strength: strength,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight
        })
        const pokemonSort = type.forEach(async function (item) {
            const conversion = parseInt(item)
            return await pokemonsProduction.addTypes(conversion)
        });
        const currentPokemon = { // les asigno los values creados a cada uno de esos attibutes
            id: pokemonsProduction.id,
            name: pokemonsProduction.name,
            life: pokemonsProduction.life,
            strength: pokemonsProduction.strength,
            defense: pokemonsProduction.defense,
            speed: pokemonsProduction.speed,
            height: pokemonsProduction.height,
            weight: pokemonsProduction.weight,
            type: types
        }
        res.status(200).json(currentPokemon)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = server;