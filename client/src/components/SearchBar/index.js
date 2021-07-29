import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPokemonName } from '../../redux/actions';
import s from './index.module.css';
import Cards from '../Cards/index';

function SearchBar(props) {

  const [input, setInput] = React.useState({name: ''});
  
  function handleChange(e) {
      setInput({name: e.target.value});
  }
  
  function handleSubmit (event) {
      event.preventDefault();
      props.getPokemonName(input.name);
      setInput({name:''})
  }

  return (
    <div className={s.searchBox}>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={s.input}>
            <input
              placeholder='Search a Pokemon'
              name='title'
              type="text"
              id='title'
              autoComplete="off"
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
                <button type='submit' className={s.btn}>SEARCH</button> 
          </div>
        </form>
    <div>
      { 
      props.pokemonName.length > 0 ? 
     
    <div>
      <img src={props.pokemonName.img} alt='' /> 
        <div>
      <h3>{props.pokemonName.name}</h3>
        </div>
      <div>
        
          <p>{props.pokemonName.types}</p>
          </div>
          </div>  
      :
      <Cards pokemon={props.pokemons} />

      }
       
        

          
            
          </div>
        
      
 </div>
</div> 
)
};

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
  pokemonName: state.pokemonName
});

function mapDispatchToProps(dispatch) {
    return {
        getPokemonName: (name) => dispatch(getPokemonName(name))
      }
    
}
  

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);