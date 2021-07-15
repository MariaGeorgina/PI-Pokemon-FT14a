import React from 'react'


const Pagination = ({ pokemonPerPage, totalPokemon, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPokemon / pokemonPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {
                pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)}>{number}</button>
                ))
            }
        </div>
    )
}

export default Pagination;