const axios = require ('axios');
const { Pokemon, Type } = require ('../db');
const { v4: uuidv1 } = require('uuid');

async function createNewPokemon(req, res) {
    const id = uuidv1();
    let data = { ...req.body, id }; //id, name, image, strength
    if (!req.body.name) return res.status(400).send('Body vacio!!!');
    try {
        const createdPoke = await Pokemon.create(data)//crea el pokemon con la data que le paso por body
        await createdPoke.addTypes(req.body.type, { through: 'pokemon_type' })// hay algunos que tienen dos tipos
        await createdPoke.addTypes(req.body.type2, { through: 'pokemon_type' })
        const poke_type = await Pokemon.findOne({// encuentra un pokemon en la base de datos y los devuelve
            where: { name: req.body.name },
            include: Types
        });
        return res.json(poke_type)// encuentra un pokemon y lo devuelve
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
};
async function getPokemons(req, res) {
    let pokeArray = [];
    if (pokeArray.length < 12) {
        try {
            let pokeResults = await axios(`https://pokeapi.co/api/v2/pokemon`)
            for (let i = 0; i < 12; i++) {
                let pokeI = await axios(pokeResults.data.results[i].url)
                let eachPoke = {}
                pokeI.data.types.length === 1 ? (eachPoke = {
                    name: pokeI.data.name,
                    img: pokeI.data.sprites.front_default,
                    types: pokeI.data.types[0].type.name
                }) :
                    (eachPoke = {
                        name: pokeI.data.name,
                        img: pokeI.data.sprites.front_default,
                        types: pokeI.data.types[0].type.name + ", " + pokeI.data.types[1].type.name
                    })
                pokeArray.push(eachPoke);
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
    }
    if (req.query.name) {
        let queryName = req.query.name.toLowerCase();
        const isItThere = await Pokemon.findOne({ where: { name: queryName } })//1ero lo busco en la base de datos
        if (isItThere === null) {
            const findByName = await axios(`https://pokeapi.co/api/v2/pokemon/${queryName}`)
            if (findByName.data === undefined) { 
                return res.status(404).send("Error, pokemon not found")
            } else {
                const found = {
                    name: findByName.data.name,
                    id: findByName.data.id,
                    img: findByName.data.sprites.front_default,
                    hp: findByName.data.stats[0].base_stat,
                    attack: findByName.data.stats[1].base_stat,
                    defense: findByName.data.stats[2].base_stat,
                    speed: findByName.data.stats[5].base_stat,
                    height: findByName.data.height,
                    weight: findByName.data.weight,
                }
                if (findByName.data.types.length === 1) {
                    found.types = findByName.data.types[0].type.name;
                } else {
                    found.type = findByName.data.types[0].type.name + ", " + findByName.data.types[1].type.name

                }
                return res.json(found).status(200)
            }
        }
        return res.json(isItThere.dataValues)//null
    } else {
        res.status(200).send(pokeArray)//devuelve los 12 pokemones
    }
};

async function getPokemonId(req, res) {
    let pokeId = req.params.idPokemon;
    if (pokeId.length < 5) {
        try {
            const findByPokeId = await axios(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
            if (findByPokeId.data === undefined) { // Busca pokeapi pero falta buscar en DB
                return res.status(404).send("Error, pokemon not found")
            } else {
                const found = {
                    name: findByPokeId.data.name,
                    id: findByPokeId.data.id,
                    img: findByPokeId.data.sprites.front_default,
                    hp: findByPokeId.data.stats[0].base_stat,
                    attack: findByPokeId.data.stats[1].base_stat,
                    defense: findByPokeId.data.stats[2].base_stat,
                    speed: findByPokeId.data.stats[5].base_stat,
                    height: findByPokeId.data.height,
                    weight: findByPokeId.data.weight,
                }
                if (findByPokeId.data.types.length === 1) {
                    found.types = findByPokeId.data.types[0].type.name;
                } else {
                    found.type = findByPokeId.data.types[0].type.name + ", " + findByPokeId.data.types[1].type.name
                }
                return res.json(found).status(200)
            }

        } catch (error) {
            console.log(error);
            res.status(400).send('Bad ID request, try another time!')
        }
    } else {
        const isItThere = await Pokemon.findOne({ where: { id: pokeId } })//busca en la base de datos
        if (isItThere === null) {
            return res.status(400).send('Bad ID request, try another time!')
        }
        return res.json(isItThere.dataValues)
    }
}

async function getTypes(req, res) {
    let tiposDB = await Type.findAll({ limit: 20 });//busco en la base de datos
    if (tiposDB.length < 20) {
        try {
            let { data } = await axios(`https://pokeapi.co/api/v2/type`);
            for (let i = 0; i < 20; i++) {
                const typeResults = data.results[i].name;
                await Type.findOrCreate({
                    where: {
                        name: typeResults,
                    }
                });
            }
            return res.redirect('/types');
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error');
        }
    }
    res.status(200).json(tiposDB);
};

module.exports = {
    getPokemons,
    getPokemonId,
    createNewPokemon,
    getTypes
}
