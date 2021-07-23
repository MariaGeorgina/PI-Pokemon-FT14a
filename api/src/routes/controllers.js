const axios = require ('axios');
const { Pokemon, Type } = require ('../db');
//const Type = require('../models/Types');

const postNewPokemon =  async (req,res)=>{

    let {name, image, hp, attack, defense, speed, height, weight, types } = req.body;
    if(!name ) {
        return res.status(400).json({message: 'Los datos enviados no son correctos.'});}
    name = name.toLowerCase();
    let dataBase = true;
    let pokeNew = await Pokemon.create({
        image,
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        dataBase
    });
    types.forEach(async (type) => {
        let dbTypes = await Type.findOne({
          where: {
            name: type,
          },
        });
    await pokeNew.addType(dbTypes);
    })
    res.json(`${pokeNew.name}`);
}
async function getPokemons(req, res) {
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
    let pokeArray = [];
    console.log(pokeArray);
    if (pokeArray.length < 20) {
        try {
            let pokeResults = await axios(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
            
            for (let i = 0; i < 20; i++) {
                let pokeI = await axios(pokeResults.data.results[i].url)
                
                let eachPoke = {}
            
                pokeI.data.types.length === 1 ? (eachPoke = {
                    name: pokeI.data.name,
                    id: pokeI.data.id,
                    img: pokeI.data.sprites.front_default,
                    attack: pokeI.data.stats[1].base_stat,
                    types: pokeI.data.types[0].type.name
                }) :
                    (eachPoke = {
                        name: pokeI.data.name,
                        id: pokeI.data.id,
                        img: pokeI.data.sprites.front_default,
                        attack: pokeI.data.stats[1].base_stat,
                        types: pokeI.data.types[0].type.name + ", " + pokeI.data.types[1].type.name
                    })
                pokeArray.push(eachPoke);
                console.log(pokeArray)
            }
       const pokemonDB = await Pokemon.findAll({
           
        include: [
            {
              model: Type,
              as: "types",
              attributes: ["id", "name"],
              through: {
                attributes: [],
              },
            },
          ],
       })
       let allPokemons = [];
        pokemonDB.length > 0 ? allPokemons = pokeArray.concat(pokemonDB) : allPokemons= pokeArray
        res.status(200).send(allPokemons)
        console.log(allPokemons)
        } //devuelve los  pokemones
        
        catch (error) {
            console.log(error);
            res.status(500).send('Internal Server Error')
        }
    } 
};
}

    
    
const getPokemonId = async (req,res)=>{
    const id = req.params.id;
    if(!id || Number(id) < 0) return res.status(400).json({message: 'El ID es invalido 99999.'}); 
    try {
    //determino si es de la API o la BD 
        ///pasa igual
    
    if(!id.includes('-')){
        //traigo el detalle de un poke de la API
        const pokeDetails = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`);
        //en un obj seteo los datos que necesito enviar
        let pokemon = {};
        //id\ - img\ -  type\ - height\ - weight\ -  stats [hp attack defense speed] 
        pokemon = {     id: pokeDetails.data.id,
                        name: pokeDetails.data.name,
                        image: pokeDetails.data.sprites.other.dream_world.front_default,//imagen
                        hp: pokeDetails.data.stats[0].base_stat,
                        attack: pokeDetails.data.stats[1].base_stat,
                        defense: pokeDetails.data.stats[2].base_stat,
                        speed: pokeDetails.data.stats[5].base_stat,
                        height: pokeDetails.data.height,
                        weight: pokeDetails.data.weight,
                        }
                        //***los types extaerlos de la BD***
                        let types = pokeDetails.data.types.map(type => {
                            let obj={};
                            return obj={name:type.type.name}
                        });
                        pokemon = {...pokemon,types:types };
                        res.json(pokemon);

    }else {
        const pokemon = await Pokemon.findByPk(String(id),{
            attributes: {exclude:['createdAt','updatedAt']},
                    include:{
                        model: Type,
                        attributes:['name']
                            }
        });
        pokemon?res.json(pokemon):res.status(400).json({message: 'El ID es invalido.'});
    }
    //validar lo que viene response.status
    }catch (error) {
        console.log('Error en la consulta de getPokemonID',error)
        res.sendStatus(500,{message: 'Hubo un problema en el servidor'})
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
    postNewPokemon,
    getTypes
}
