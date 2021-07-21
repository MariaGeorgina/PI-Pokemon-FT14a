import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDoubleUp } from 'react-icons/fa';
import s from './index.module.css';


const LandingPage = () => {


    return (
        <div className={[s.main, s.flex].join(' ')}>
            <div className={[s.boxDescription, s.flex].join(' ')}>
            </div>
                <div className={s.swipeUp}>
                    <Link to="/home" >
                        <FaAngleDoubleUp style={{color: `blue`}}/>
                            <span>Swipe up</span>
                    </Link>
                </div>
      </div>
    )
};
export default LandingPage;