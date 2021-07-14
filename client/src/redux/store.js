import { createStore, applyMiddleware } from 'redux';
import { pokemonReducer } from './reducers.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store = createStore(pokemonReducer,
    composeWithDevTools(applyMiddleware(thunk)))

export default store;