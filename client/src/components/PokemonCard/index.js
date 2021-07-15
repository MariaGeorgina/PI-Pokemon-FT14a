import React from 'react';
import { Link } from 'react-router-dom';

//import './Card.css';

const PokemonCard = (props) => {
  return (
    <div>
      {
        <div>
          <div>
            <img src={props.pokemon.img} alt='' />
            <div>
              <h5>{props.pokemon.name}</h5>
            </div>
            <div>{props.pokemon.types.length > 1
                    ? <p>Types: <br></br>
                      {props.pokemon.types[0]} & {props.pokemon.types[1]}</p>
                    : <p>Type: <br></br> 
                      {props.pokemon.types[0]}
                    </p>}
            </div>
            <Link to={`/home/detail/${props.pokemon.id}`}>
              <button type='submit'>
                More Details
              </button>
            </Link>
          </div>
        </div>
      }
    </div>
  );
};

export default PokemonCard;