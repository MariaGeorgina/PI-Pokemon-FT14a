import { useEffect } from 'react';
import { getPokemonType } from '../../redux/actions.js';
import { connect } from 'react-redux';

const GetPokemonType = ({ getPokemonType }) => {
    useEffect(() => {
        getPokemonType()
    }, [])

    return null
};

function mapStateToProps(state) {
    return {
        types: state.types,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getPokemonType: () => dispatch(getPokemonType()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetPokemonType);