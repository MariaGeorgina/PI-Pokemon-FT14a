import LandingPage from './components/LandingPage';
import { Route } from 'react-router-dom';
import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Form from './components/AddingAPokemon';
import PokemonDetails from './components/PokemonDetails/pokemonDetail';


function App() {
  const [mobile, setMobile] = React.useState(false);
  const isMobile = () => { setMobile(!mobile) };// function para que se muestre el menú en caso de que no sea mobile
  
  return (
    <React.Fragment>
      <NavBar isMobile={isMobile}/>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/addPokemon' component={Form} />
      <Route exact path='/home/:id' component={PokemonDetails}/>
    </React.Fragment>
  );
}

export default App;
