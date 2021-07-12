const axios = require ('axios');
const { Pokemon, Type } = require ('../db');

const getPokemons = async function (req, res) {
    const name = req.query.name;
    try {
        if(name !== undefined) {
            if (name && name !== '') {
                let pokemonSearched = {};
                pokemonSearched = await Pokemon.findOne({
                    where: {name},
                    attributes: {exclude: ['createdAt', 'updatedAt']},
                    include: {
                        model: Type,
                        attributes: ['name']
                    }
                })
                if (pokemonSearched) {
                    return res.json(pokemonSearched);
                } else {
                    const pokemonAPI = await axios (`https://pokeapi.co/api/v2/pokemon/${name}`)
                        if(pokemonAPI) {
                            pokemonSearched = { name: pokemonAPI.data.name,
                                                id: pokemonAPI.data.id,
                                                image: pokemonAPI.data.sprites.front_default,
                                                life: pokemonAPI.data.stats[0].base_stat,
                                                strength: pokemonAPI.data.stats[1].base_stat,
                                                defense: pokemonAPI.data.stats[2].base_stat,
                                                speed: pokemonAPI.data.stats[5].base_stat,
                                                height: pokemonAPI.data.height,
                                                weight: pokemonAPI.data.weight
                                              }
                            let types = pokemonAPI.data.types.map(type => type.type.name);
                            pokemonSearched = { ...pokemonSearched, types: types };
                            return res.json(pokemonSearched);
                        }
                }
            }
        }
        const pokeApi = await axios (`https://pokeapi.co/api/v2/pokemon?limit=40`);
        const pokemonDB = await Pokemon.findAll({
            attributes: ['name', 'id', 'image', 'height'],
            include: {
                model: Type,
                attributes: ['name']
            }
        });
        let pokemonDetails = await Promise.all (
            pokeApi.data.results.map(async poke => await axios(poke.url))
        )
        pokemonDetails = pokemonDetails.map(poke => {
            let newPokemon = { name: poke.data.name,
                               id: poke.data.id,
                               image: poke.data.sprites.front_default,
                               height: poke.data.height
            }
            let types = poke.data.types.map(type =>  type.type); 
            types.map(type => delete type.url);       
            return newPokemon = {...newPokemon, types:types };
        })
        pokemonDetails = pokemonDetails.concat(pokemonsDB);
        return res.json( {  numPokemons:pokemonDetails.length,
                            pokes: pokemonDetails} );  
    } catch (error) {
        console.log('Error en la consulta de getPokemons',error);
    }
}

const getPokemonId = async function (req,res) {
    const id = req.params.id;
    if(!id || Number(id) < 0) return res.status(400).json({message: 'El ID es invalido 99999.'}); 
    try {
    if(!id.includes('-')){
        const pokemonDetails = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let pokemon = {};
        pokemon = {     name: pokemonDetails.data.name,
                        id: pokemonDetails.data.id,
                        image: pokemonDetails.data.sprites.front_default,
                        life: pokemonDetails.data.stats[0].base_stat,
                        strength: pokemonDetails.data.stats[1].base_stat,
                        defense: pokemonDetails.data.stats[2].base_stat,
                        speed: pokemonDetails.data.stats[5].base_stat,
                        height: pokemonDetails.data.height,
                        weight: pokemonDetails.data.weight,
                        }
                        let types = pokemonDetails.data.types.map(type => {
                            let obj={};
                            return obj={ name: type.type.name }
                        });
                        pokemon = {...pokemon, types:types };
                        res.json(pokemon);

    }else {
        const pokemon = await Pokemon.findByPk(String(id),{
            attributes: { exclude: ['createdAt','updatedAt'] },
                    include:{
                        model: Type,
                        attributes:['name']
                            }
        });
        pokemon ? res.json(pokemon) : res.status(400).json({message: 'El ID es invalido.'});
    }
    }catch (error) {
        console.log('Error en la consulta de getPokemonID',error)
    }
}

const createNewPokemon =  async function (req,res) {
    let {name, image, life, strength, defense, speed, height, weight, types } = req.body;
    if(!name ) {
        return res.status(400).json({message: 'Los datos enviados no son correctos.'});}
    name = name.toLowerCase();
    let newPokemon = await Pokemon.create({
        name,
        image,
        life,
        strength,
        defense,
        speed,
        height,
        weight,
    });
    newPokemon.addType(types);
    res.json(`${newPokemon.name}`);
}

const getTypes = async function (req,res) {
    try {
        const typesDB = await Type.findAll(
           { attributes: ['name','id']}
        );
        if (typesDB.length === 0) {
            let typesResults = await axios(`https://pokeapi.co/api/v2/type`);
            var types = typesResults.data.outcome.map(type => {return {name: type.name}} );
            Type.bulkCreate(types);
            return res.json(types)
        }
    res.json(typesDB)
    } catch (error) {
        console.log('Error en la consulta de Types',error);
    }
}

module.exports = {
    getPokemons,
    getPokemonId,
    createNewPokemon,
    getTypes
}
