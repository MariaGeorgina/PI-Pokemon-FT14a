import React from 'react';
import { Link } from 'react-router-dom';
import './index.module.css';
import s from './index.module.css';

const PokemonCard = (props) => {
  
  return (
    <div className={s.card}>
            <img src={props.img} alt='' className={s.cardImg} /> 
        <div className={s.name}>
            <h3>{props.name}</h3>
        </div>
            <div className='type-container'>
              <h3>Types:</h3><br></br>
               <p className={s.typing}>{typeof props.id !== 'number' && props.types ? props.types.map((type) => type.name).join(", ")  
: props.types && props.types.length > 0 ? 
  props.types
  : props.type ? props.type : null}</p>
            </div>
                <Link to={`/home/${props.id}`}>
                  
              <button type='submit'>
                More Details
              </button>
                </Link>  
    </div>
  );
};

export default PokemonCard;