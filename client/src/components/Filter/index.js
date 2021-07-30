import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonType, sortPokemons, filterPokemonsByType, filterPokemonsBySource } from "../../redux/actions";
import s from './index.module.css';

function Filter() {
  const dispatch = useDispatch();
  const types = useSelector((store) => store.types);
  const filteredPokemons = useSelector((store) => store.filteredPokemons);

  useEffect(() => {
    dispatch(getPokemonType());
  }, [filteredPokemons]);

  //useEffect(() => {
   //   dispatch(sortPokemons());
  //}, [pokemons])

  const handleFilter = (e) => {
    dispatch(filterPokemonsByType(e.target.value));
  };

  //Filter by Creator
 const handleCreator = (e) => {
  
 dispatch(filterPokemonsBySource(e.target.value));
  };

  //Order
  const handleOrder = (e) => {
      dispatch(sortPokemons(e.target.value));
  };
  

  return (
    <div className={s.filters}>
      <form className={s.formControl}>
        <div className={s.types}>
          <p>Filter by Type</p>
          <select className={s.searchInput} onChange={(e) => handleFilter(e)}>
            <option default>All</option>
            {types.map((t) => (
              <option key={t.typeId} value={t.name}>
                {t.name}
              </option> 
            ))}
          </select>
        </div>
        <div className={s.source}>
          <p>Filter by Source</p>
          <select className={s.searchInput} onChange={(e) => handleCreator(e)}>
            <option value='All'>All</option>
            <option value="Api">Api Pokemons</option>
            <option value="Created">Created Pokemons</option>
          </select>
        </div>
        <div className={s.order}>
          <p>Order</p>
          <select className={s.searchInput} onChange={(e) => handleOrder(e)}>
            <option default>Select</option>
            <option value="asc_name">Alphabetically (A-Z)</option>
            <option value="desc_name">Alphabetically (Z-A)</option>
            <option value="asc_attack">Attack (Lower-Higher)</option>
            <option value="desc_attack">Attack (Higher-Lower)</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Filter;