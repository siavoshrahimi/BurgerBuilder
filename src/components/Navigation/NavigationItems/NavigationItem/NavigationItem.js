import React from 'react';

import { NavLink } from 'react-router-dom';
import './NavigationItem.scss'

const NavigationItem = (props) =>(
    <li className='NavigationItem'>
        <NavLink
            to={props.link}
            exact={props.exact}
        >{props.children}</NavLink>
    </li>
)

export default NavigationItem;