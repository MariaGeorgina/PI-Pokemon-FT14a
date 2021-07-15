import React from 'react';
import { Link } from 'react-router-dom';

//import './CardDetail.css';

const CardDetail = (props) => {
    return (
        <div>
            <div>
                <div>
                    <h5>{props.name}</h5>
                </div>
                <img src={props.img} alt='' />
                <p>ID: {props.id}</p>
            </div>
            <div>
                <div>
                    <div>HP: {props.hp}</div>
                    <div>Attack: {props.attack}</div>
                    <div>Defense: {props.defense}</div>
                    <div>Speed: {props.speed}</div>
                    <div>Weight: {props.weight}</div>
                    <div>Height: {props.height}</div>
                    <div>Type: {props.types?.map((t) => {
                        return<p>{t} </p>})}</div>
                    <Link to={`/home`}>
                        <button type='submit'>
                            Go Back
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CardDetail;