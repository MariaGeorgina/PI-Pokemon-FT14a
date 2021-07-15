import React from 'react';
import PokemonCard from '../PokemonCard';

//import './Cards.css';

const Cards = ({ pokemons }) => {
  return (
    <div className='cards'>
      {
        pokemons.map((pokemon, i) => (
          <PokemonCard pokemon={pokemon} index={i}/>
        )
        )}
    </div>
  );
};

export default Cards;