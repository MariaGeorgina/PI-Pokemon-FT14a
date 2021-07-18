import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPokemons, getPokemonName } from '../../redux/actions';
//import s from './index.module.css';

function SearchBar(props) {

  const [name, setName] = React.useState('');
  
  function handleChange(e) {
      setName(e.target.value);
  }
  
  function handleSubmit (event) {
      event.preventDefault();
      props.getPokemonName(name);
  }

  return (
      <div>
          <form onSubmit={(e) => handleSubmit(e)}>
              <input
              type="text"
              autoComplete="off"
              value={name}
              onInput={(e) => handleChange(e)}
              placeholder='Pokemon'
          />
          <button type='Submit'>SEARCH</button>
          </form>
      </div>
  )
};

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
  display_pokemons: state.display_pokemons
});

function mapDispatchToProps(dispatch) {
    return {
      getPokemons: function() {
        dispatch(getPokemons())
      },
      getPokemonName: function(name) {
        dispatch(getPokemonName(name))
      }
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);