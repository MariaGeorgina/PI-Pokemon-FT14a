import React, { useState, useEffect } from 'react';
import Cards from '../Cards';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail, getPokemons, getPokemonType } from '../../redux/actions';
import { v1 as uuidv1 } from "uuid";
import SearchBar from '../SearchBar';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 12;
    const [pokemons, setPokemons] = useState([]);
    
    const [types, setTypes] = useState([]);
    const types2 = useSelector(store => store.types);//me carga los types que estan en el Store
    let pokemons1 = useSelector(store => store.pokemons);//carga los pokemons que están en el store
    const pokemonDetail = useSelector(store => store.pokemonDetail);
   
    
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getPokemonDetail());
    }, [])
    
    useEffect(() => {
        dispatch(getPokemons());
    }, [])

    useEffect (() => {
        dispatch(getPokemonType());
    }, [])
    
    
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = pokemons1.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    return (
        <div>
            <SearchBar />
                <div>
            <Cards pokemons={currentPokemon} />
                </div>
            <Pagination
                key={uuidv1()}
                pokemonPerPage={pokemonPerPage}
                totalPokemon={pokemons1.length}
                paginate={paginate}
            />
        </div>
    )

}
export default Home;