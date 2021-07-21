import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPokemons, getPokemonName } from '../../redux/actions';
//import s from './index.module.css';
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
      <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <input
              placeholder='Search a Pokemon'
              name='title'
              type="text"
              id='title'
              autoComplete="off"
              value={input.name}
              onChange={(e) => handleChange(e)}
          />
          <button type='Submit'>SEARCH</button>
            </div>
          </form>
         
            {
             // props.pokemons && props.pokemons.map (p => (
                <div>
                  <Cards />
                </div>
              //))
            }
          
      </div>
  )
};

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});

function mapDispatchToProps(dispatch) {
    return {
        getPokemonName: (name) => dispatch(getPokemonName(name))
      }
    
}
  

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);