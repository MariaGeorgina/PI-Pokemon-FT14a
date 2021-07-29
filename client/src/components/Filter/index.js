import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemonType, sortPokemons, filterPokemonsByType, filterPokemonsBySource } from "../../redux/actions";


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
    <div>
      <form className="form-control">
        <div>
          <p>Filter by Type</p>
          <select className="search-input" onChange={(e) => handleFilter(e)}>
            <option default>All</option>
            {types.map((t) => (
              <option key={t.typeId} value={t.name}>
                {t.name}
              </option> 
            ))}
          </select>
        </div>
        <div>
          <p>Filter by Source</p>
          <select className="search-input" onChange={(e) => handleCreator(e)}>
            <option value='All'>All</option>
            <option value="Api">Api Pokemons</option>
            <option value="Created">Created Pokemons</option>
          </select>
        </div>
        <div>
          <p className="title-filter">Order</p>
          <select className="search-input" onChange={(e) => handleOrder(e)}>
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