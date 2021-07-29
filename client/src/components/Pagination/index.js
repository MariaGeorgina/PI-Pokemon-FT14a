import React from 'react'
import s from './index.module.css';

const Pagination = ({ pokemonPerPage, totalPokemon, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPokemon / pokemonPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={s.pagination}>
                    {
                    pageNumbers.map(number => (
                        <div key={number} className={s.pagDiv}>
                            <button className={s.button} key={number} onClick={() => paginate(number)}>{number}</button> 
                                
                            
                        </div>
                        
                    ))
                    }
                    
        
        </div>
    )
}


export default Pagination;