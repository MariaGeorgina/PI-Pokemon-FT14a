import axios from axios;
const GET_POKEMON_ID = 'GET_POKEMON_ID';
const GET_POKEMONS = 'GET_POKEMONS';
const GET_POKEMON_NAME = 'GET_POKEMON_NAME';
const GET_POKEMON_TYPE = 'GET_POKEMON_TYPE';
const POKEMON_DETAIL_RESET = 'POKEMON_DETAIL_RESET';
const ADD_POKEMON = 'ADD_POKEMON';
const POKEMON_BY_NAME_RESET = 'POKEMON_BY_NAME_RESET';

export const getPokemonId = (id) => async function (dispatch) {
    try {
        const result = await axios (`http://localhost:3001/pokemons/${id}`);
        dispatch({
            type: GET_POKEMON_ID,
            payload: result.data
        })
    } catch (error) {
        console.log('Error de getPokemonId', error);
    }
}

export const getPokemons = () => async function (dispatch) {
    try {
        const result = await axios (`http://localhost:3001/pokemons`);
        dispatch({
            type: GET_POKEMONS,
            payload: result.data
        })
    } catch (error) {
        console.log('Error de getPokemons', error);
    }
}

export const getPokemonName = (name) => async function (dispatch) {
    try {
        const result = await axios (`http://localhost:3001/pokemons?name=${name}`);
        dispatch({
            type: GET_POKEMON_NAME,
            payload: result.data
        })
    } catch (error) {
        console.log('Error de getPokemonName', error);
    }
}

export const getPokemonType = () => async function (dispatch) {
    try {
        const result = await axios (`http://localhost:3001/type`);
        dispatch({
            type: GET_POKEMON_TYPE,
            payload: result.data
        })
    } catch (error) {
        console.log('Error de getPokemonType', error);
    }
}

export const getPokemonByNameReset = () => {
    return (dispatch) => {
        dispatch({
            type: POKEMON_BY_NAME_RESET,
            payload: []
        })
    }
};

export const getPokemonDetailReset = () => {
    return (dispatch) => {
        dispatch({
            type: POKEMON_DETAIL_RESET,
            payload: []
        })
    }
};

export const addPokemon = (obj) => {
    return (dispatch) =>
        fetch("http://localhost:3001/pokemons", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then((answer) => answer.json())
            .then((answer) => {
                dispatch({
                    type: ADD_POKEMON,
                    payload: answer
                })
            })
};