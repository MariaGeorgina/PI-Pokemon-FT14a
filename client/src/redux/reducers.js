const initialState = {
    pokemons: [],
    pokemonName: [],
    pokemonDetail: {},
    types: [],
    dataDB: {}
}

export const pokemonReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'GET_POKEMON_ID':
            return {
                ...state,
                pokemonDetail: action.payload
            }
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            }
        
        case 'GET_POKEMON_NAME':
            return {
                ...state,
                pokemonName: action.payload
            }
        case 'GET_POKEMON_TYPE':
            return {
                ...state,
                types: action.payload
            }
        case 'POKEMON_BY_NAME_RESET':
            return {
                ...state,
                pokemonName: action.payload
            }
        case 'POKEMON_DETAIL_RESET':
            return {
                ...state,
                pokemonDetail: action.payload
            }
        case 'ADD_POKEMON':
            return {
                ...state,
                pokemonCreated: action.payload
            }
        
        default:
            return state
        }
    }

export default pokemonReducer;