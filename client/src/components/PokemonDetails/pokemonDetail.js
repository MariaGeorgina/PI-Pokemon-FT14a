import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getPokemonDetail } from "../../redux/actions";
import { useParams } from 'react-router-dom';
import s from './index.module.css';

const PokemonDetails = () => {
    const dispatch = useDispatch();

    const {id} = useParams();
    useEffect(()=>{
      dispatch(getPokemonDetail(id))
    },[dispatch])
    
    const pokemonDetail = useSelector(store => store.pokemonDetail);

    if(!pokemonDetail){
      return (
        <h1>Loading...</h1>
      )
    }
  return (
    <div className={s.ctn}>
      <div className={s.card}>
        <div className={s.divImg}>
          <img src={pokemonDetail.image} alt="" width='300' height='300'/>
        </div>
             <div className={s.data}>
                <div className={s.name}>
                    <p>{pokemonDetail.name}</p>
                </div>
                      <div className={s.id}>
                        <p>ID: {pokemonDetail.id}</p>
                      </div>
                         <div className={s.details}>
                            <div className={s.abilities}>
                                <div className={s.abiName}>ABILITIES</div>
                                    <div className={s.abiData}>
                                        <div className={s.abiDataLife}>
                                            <div className={s.text}><label>Life:</label></div>
                                            <div className={s.text}><p >{pokemonDetail.hp}</p></div>
                                        </div>
                                              <div className={s.abiDataAttack}>
                                                 <div><label>Attack:</label></div>
                                                 <div><p >{pokemonDetail.attack}</p></div>
                                              </div>
                                                    <div className={s.abiDataDefense}>
                                                        <div><label>Defense:</label></div>
                                                        <div><p>{pokemonDetail.defense}</p></div>
                                                    </div>
                                                            <div className={s.abiDataSpeed}>
                                                                <div><label>Speed:</label></div>
                                                                <div><p >{pokemonDetail.speed}</p></div>
                                                            </div>
                                    </div>
                            </div>
                                                                    <div className={s.abilities}>
                                                                        <div>FEATURES</div>
                                                                            <div className={s.abiData}>
                                                                            <div className={s.abiDataHeight}>
                                                                            <div><label>Height:</label></div>
                                                                            <div><p >{pokemonDetail.height}</p></div>
                                                                            </div>
                                                                            <div className={s.abiDataWeight}>
                                                                            <div><label>Weight:</label></div>
                                                                            <div><p>{pokemonDetail.weight}</p></div>
                                                                            </div>
                                                                            <div className={s.abiDataTypes}>
                                                                            <div><label>Type:</label></div>
                     <div>
                                                        {
                                                        pokemonDetail.types?.map((tip)=> <p>{tip.name}</p>)
                                                        }
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                        </div>
                        
            </div>
        
    )
}
 
export default PokemonDetails;