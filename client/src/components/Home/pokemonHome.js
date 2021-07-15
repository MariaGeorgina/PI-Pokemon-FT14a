import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";

const PokemonHome = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPokemons());
    }, []);
    return null;
};

export default PokemonHome;