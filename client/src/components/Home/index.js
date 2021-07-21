import React, { useState, useEffect } from 'react';
import Cards from '../Cards';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getPokemonType, sortPokemons } from '../../redux/actions';
import { v1 as uuidv1 } from "uuid";
import SearchBar from '../SearchBar';
import Filter from '../Filter/index';
import s from './index.module.css';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 8;
    
    const types = useSelector(store => store.types);//me carga los types que estan en el Store
    let pokemons = useSelector(store => store.pokemons);//carga los pokemons que están en el store
    const filteredPokemons = useSelector(state => state.filteredPokemons);
    //const filterBy = useSelector(state => state.filterBy);
   //const orderBy = useSelector(state => state.orderBy);
    //let allPokemons;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons());
    }, [])

    useEffect (() => {
        dispatch(getPokemonType());
    }, [])
    
    //filterBy === "All" && orderBy === "Select" && pokemons.length > 0
    //? (allPokemons = pokemons)
    //: (allPokemons = filteredPokemons);
    //console.log(allPokemons);
    
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = pokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div classname={s.name}>
            <SearchBar />
            <Filter />
                <div>
            <Cards pokemons={currentPokemon} />
                </div>
            <Pagination
                key={uuidv1()}
                pokemonPerPage={pokemonPerPage}
                totalPokemon={pokemons.length}
                paginate={paginate}
            />
        </div>
    )

}
export default Home;