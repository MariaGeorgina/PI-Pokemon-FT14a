


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
                pokemonName: [action.payload]
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
        case 'FILTER_TYPE_POKEMON':
            let pokemonsToFilter = state.filteredPokemons.length > 0 ? state.filteredPokemons.map((pokemon) => pokemon) : state.pokemons.map((pokemon) => pokemon)
            return {
                ...state,
                filteredPokemons: pokemonsToFilter.filter(poke=> poke.types.includes(action.payload))
                }
        case 'SORT_POKEMONS': {
            let pokemonsToOrder = state.filteredPokemons.length > 0 ? state.filteredPokemons.map((pokemon) => pokemon) : state.pokemons.map((pokemon) => pokemon)
            return {
           ...state,
            filteredPokemons: orderPokemons(action.payload, pokemonsToOrder)  
        }
    }
        case 'FILTER_BY_SOURCE': {
            let pokemonsBySource = state.filteredPokemons.length > 0 ? state.filteredPokemons.map((pokemon) => pokemon) : state.pokemons.map((pokemon) => pokemon)
            return {
                ...state,
                filteredPokemons: pokemonsBySource.filter(poke => poke.hasOwnProperty('dataBase'))
            }
        }
        case 'RESET': {
            return {
              ...state,
              pokemons: [],
              pokemonName: [],
              filteredPokemons: [],
              types: [],
            };
          }
        default:
            return state;
        }
    }

export default pokemonReducer;