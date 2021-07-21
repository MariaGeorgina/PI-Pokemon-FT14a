import PokemonCard from '../PokemonCard';
import React from 'react';
import { v1 as uuidv1 } from "uuid";
import s from './index.module.css';

const Cards = ({ pokemons }) => {
  
  return (
    <div className={s.cards}>
      {pokemons && pokemons.map((data) => <PokemonCard key={uuidv1()} {...data} />
        )}
    </div>
  );
};

export default Cards;