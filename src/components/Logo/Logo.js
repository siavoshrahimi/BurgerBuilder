import React from 'react';

import burgerLogo from '../../assests/image/27.1 burger-logo.png.png';
import './Logo.scss';


const logo = (props) => (
    <div className='Logo'>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
)

export default logo;