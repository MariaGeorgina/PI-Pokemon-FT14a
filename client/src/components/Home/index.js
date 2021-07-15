import React, { useState } from 'react';
import Cards from '../Cards';
import Pagination from '../Pagination';
import PokemonHome from './pokemonHome';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    
    const [pokemons, setPokemons] = useState([]);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemon = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const paginate = pageNumber => setCurrentPage(pageNumber);
   
    
    return (
        <div>
            <PokemonHome/>
            <div>
            <Cards pokemons={currentPokemon}/>
            </div>
            <Pagination
                pokemonsPerPage={pokemonsPerPage}
                totalPokemon={pokemons.length}
                paginate={paginate}
            />
        </div>
    )
};

export default Home;