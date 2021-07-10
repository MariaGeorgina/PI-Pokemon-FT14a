import LandingPage from './components/LandingPage';
import { Route } from 'react-router-dom';
import React from 'react';
import NavBar from './components/NavBar';

function App() {
  const [mobile, setMobile] = React.useState(false);
  const isMobile = () => { setMobile(!mobile) };// function para que se muestre el menú en caso de que no sea mobile
  
  return (
    <React.Fragment>
      <NavBar isMobile={isMobile}/>
      <Route exact path='/' component={LandingPage} />
    </React.Fragment>
  );
}

export default App;
