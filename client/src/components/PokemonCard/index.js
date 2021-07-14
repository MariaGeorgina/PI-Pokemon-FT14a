import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import s from './index.module.css';

const PokemonCard = ({ name, id, image, types }) => {
    return (
      <Fragment>
        {
          <div>
            <div>
              <img src={image} />
              <div>
                <h5>{name}</h5>
              </div>
              <div>{types.length > 1
                      ? <p>Types: <br></br>
                        {types[0]} & {types[1]}</p>
                      : <p>Type: <br></br> 
                        {types[0]}
                      </p>}
              </div>
              <Link to={`/home/detail/${id}`}>
                <button type='submit'>
                  More Details
                </button>
              </Link>
            </div>
          </div>
        }
      </Fragment>
    );
  };

export default PokemonCard;