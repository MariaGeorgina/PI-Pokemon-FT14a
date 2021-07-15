import LandingPage from './components/LandingPage';
import { Route } from 'react-router-dom';
import React from 'react';
import NavBar from './components/NavBar';
import CardDetails from './components/CardDetails';
import GetPokemonType from './components/Types';
import PokemonHome from './components/Home/pokemonHome';
import Home from './components/Home';

function App() {
  const [mobile, setMobile] = React.useState(false);
  const isMobile = () => { setMobile(!mobile) };// function para que se muestre el menú en caso de que no sea mobile
  
  return (
    <React.Fragment>
      <NavBar isMobile={isMobile}/>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/' component={GetPokemonType} />
      <Route exact path='/' component={PokemonHome} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/pokemon/:id' component={CardDetails}/>
    </React.Fragment>
  );
}

export default App;
