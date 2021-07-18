import React from 'react';
import { Link } from 'react-router-dom';
import './index.module.css';
import s from './index.module.css';

const PokemonCard = ({id, name, img, types}) => {
  
  return (
    <div className={s.card}>
            <img src={img} alt='' className={s.cardImg} /> 
        <div className={s.name}>
            <h3>{name}</h3>
        </div>
            <div className='type-container'>
              <h3>Types:</h3><br></br>
                <p>{types}</p>
            </div>
                <Link to={`/home/${id}`}>
              <button type='submit'>
                More Details
              </button>
                </Link>  
    </div>
  );
};

export default PokemonCard;