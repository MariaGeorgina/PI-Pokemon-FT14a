import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import logo from '../../images/logo.jpg';
import s from './index.module.css';

const NavBar = ({ isMobile }) => {// renders the NavBar if it isn't a mobile device
    return (
        <nav>
            <NavLink to="/" className={s.logoSide} >
                <img className={s.logo} src={logo} alt='Not Found' />
            </NavLink>
            <div className={s.mobileMenu} onClick = {isMobile}>
                <FaBars/>
            </div>
            <div className={s.menu}>
                <NavLink to="/pokemons" className={s.link} activeClassName={s.active}>Home</NavLink>
                <NavLink to="/addPokemon" className={s.link} activeClassName={s.active}>Add your own</NavLink>
            </div>
        </nav>
    )
}

export default NavBar;