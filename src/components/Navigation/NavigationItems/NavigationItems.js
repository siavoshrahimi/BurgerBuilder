import React from 'react';

import './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) =>(
    <ul className='NavigationItems'>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {props.isAuthenticated
          ?<NavigationItem link='/orders'>Orders</NavigationItem> :null}
        {props.isAuthenticated
          ? <NavigationItem link='/logout'>Logout</NavigationItem>
          : <NavigationItem link='/auth'>Authentication</NavigationItem>
        }
    </ul>
)
export default NavigationItems;