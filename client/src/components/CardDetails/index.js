import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { getPokemonId, getPokemonDetailReset } from "../../redux/actions.js";


const PokemonDetail = ({ match, pokemon_detail, getPokemonDetailReset, getPokemonId }) => {

  useEffect(() => {
    getPokemonId(match.params.id)
    return () => { getPokemonDetailReset() }
  }, [])

  return (
    <div>
      <Nav/>
      <CardDetail 
      id={pokemon_detail.id}
      name={pokemon_detail.name}
      img={pokemon_detail.img}
      hp={pokemon_detail.hp}
      attack={pokemon_detail.attack}
      defense={pokemon_detail.defense}
      speed={pokemon_detail.speed}
      weight={pokemon_detail.weight}
      height={pokemon_detail.height}
      type={pokemon_detail.type}
      />
    </div>
  )
};

function mapStateToProps(state) {
  return {
    pokemon_detail: state.pokemon_detail,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getPokemonId: (pokemon) => dispatch(getPokemonId(pokemon)),
    getPokemonDetailReset: () => dispatch(getPokemonDetailReset())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail);