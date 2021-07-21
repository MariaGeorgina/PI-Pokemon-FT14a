


function orderPokemons (order, array) {
   switch(order) {
       case 'asc_name':
           return array.sort((a, b) => (a.name > b.name ? 1 : -1))
       case 'desc_name':
           return array.sort((a, b) => (a.name < b.name ? 1 : -1))    
       case 'asc_attack':
           return array.sort((a, b) => (a.attack > b.attack ? 1 : -1))    
       case 'desc_attack':
           return array.sort((a, b) => (a.attack < b.attack ? 1 : -1))
       default:
       return array
  }
    
}

const initialState = {
    pokemons: [],
    pokemonName: [],
    pokemonDetail: {},
    types: [],
    pokemonCreated: null,
    orderBy: 'Select',
    filteredPokemons: [],
    filteredBy: 'All',
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
                pokemons: action.payload,
                
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
        case 'ADD_POKEMON':
            return {
                ...state,
                pokemonCreated: action.payload
            }
            case 'FILTER_ORIGIN_POKEMON':
                if (action.payload === 'Created') {
                    return {...state, filteredPokemons: state.pokemons};
                } else if (action.payload === 'Api') {
                    return {...state, filteredPokemons: state.pokemonsLoaded};
                } else {
                    return {
                        ...state,
                        filteredPokemons: state.pokemonsLoaded.concat(state.pokemons),
                    };
                }
            case 'FILTER_TYPE_POKEMON':
                if (action.payload === 'All') {
                    return {...state, pokemonsShowed: state.filteredPokemons};
                } else {
                    return {
                        ...state,
                        pokemonsShowed: state.filteredPokemons.filter((el) =>
                            el.types.includes(action.payload)
                        ),
                    };
                }
        case 'SORT_POKEMONS':
            return {
           ...state,
            filteredPokemons: orderPokemons(action.payload, state.pokemons)  
        }
       
        default:
            return state;
        }
    }

export default pokemonReducer;