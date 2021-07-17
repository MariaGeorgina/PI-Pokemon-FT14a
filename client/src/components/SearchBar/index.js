import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//import './SearchBar.css'

export const SearchBar = () => {
    const [namePokemon, setNamePokemon] = useState('');

    const handleChange = (e) => {
        setNamePokemon(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (namePokemon) {
            setNamePokemon({})
        }
    };

    return (
        <div className='search-bar-container'>
            <h2>Search a Pokemon</h2>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        className='input'
                        type='text'
                        autoComplete='off'
                        onChange={handleChange}
                    />
                    <div>
                        <Link to={`/home/${namePokemon}`}>
                            <button type='submit'>
                                Search
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
            <div>
            </div>
        </div >
    );
};


export default SearchBar;