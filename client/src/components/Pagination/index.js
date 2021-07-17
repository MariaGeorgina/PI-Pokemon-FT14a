import React from 'react'
import s from './index.module.css';

const Pagination = ({ pokemonPerPage, totalPokemon, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPokemon / pokemonPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div classname={s.ctn}>
            <nav className={s.pagination}>
                <ul>
            {
                pageNumbers.map(number => (
                    <div classname={s.pagDiv} key={number}>
                        <li key={number} >
                            <a onClick={() => paginate(number)} href="#" className='page-link'>
                                {number}
                            </a>
                            </li>
                    </div>
                ))
            }
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;