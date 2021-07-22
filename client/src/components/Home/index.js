import React, { useState, useEffect } from 'react';
import Cards from '../Cards';
import Pagination from '../Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getPokemonType } from '../../redux/actions';
import { v1 as uuidv1 } from "uuid";
import SearchBar from '../SearchBar';
import Filter from '../Filter/index';
import s from './index.module.css';

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 12;
   
    const [firstRender, setFirstRender] = useState(true);
    const types = useSelector(store => store.types);//me carga los types que estan en el Store
    let pokemons = useSelector(store => store.pokemons);//carga los pokemons que están en el store
    const filteredPokemons = useSelector(state => state.filteredPokemons);
    //const filterBy = useSelector(state => state.filterBy);
   //const orderBy = useSelector(state => state.orderBy);
    //let allPokemons;
    const pokemonName = useSelector(store => store.pokemonName);
    const [pokemonsShowed, setPokemonsShowed] = useState (pokemons);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if (firstRender === true) {
        dispatch(getPokemons());
        dispatch(getPokemonType());
        setFirstRender(false);
    }
       if(filteredPokemons.length > 0) {
           setPokemonsShowed(filteredPokemons)
           
       } else if (pokemonName.length > 0) {
        setPokemonsShowed(pokemonName)
       }
       else {
           setPokemonsShowed(pokemons)
    
       } 

    }, [pokemons, filteredPokemons, pokemonName])

    useEffect (() => {
        dispatch(getPokemonType());
    }, [])
    
    //filterBy === "All" && orderBy === "Select" && pokemons.length > 0
    //? (allPokemons = pokemons)
    //: (allPokemons = filteredPokemons);
    //console.log(allPokemons);
    
    let indexOfLastPokemon = currentPage * pokemonPerPage;
    let indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    let currentPokemon = pokemonsShowed.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div className={s.home}>
            <SearchBar />
            <Filter />
                <div>
            <Cards pokemons={currentPokemon} />
                </div>
            <Pagination
                key={uuidv1()}
                pokemonPerPage={pokemonPerPage}
                totalPokemon={pokemonsShowed.length}
                paginate={paginate}
            />
        </div>
    )

}
export default Home;