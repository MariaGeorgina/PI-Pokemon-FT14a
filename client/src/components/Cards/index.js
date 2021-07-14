import PokemonCard from '../PokemonCard';
import { Fragment } from 'react';
import Loading from './Loading';

const Cards = ({records}) => {
    return (
        <Fragment>
            <div>
                { records.length < 1 ?
                    <Loading/> :
                    records.map((element, i) =>
                        <PokemonCard key={i}
                                     name={element.name}
                                     image={element.image}
                                     types={element.types}
                                     id={element.id}
                        />
                    )    
                }
            </div>
        </Fragment>
    );
}
export default Cards;