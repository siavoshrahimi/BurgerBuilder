import React from "react";


import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

import './SideDrwer.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux1';

const sideDrawer = (props) =>{
    let attachedClass = ['SideDrawer', 'Close'];
    if(props.open){
        attachedClass = ['SideDrawer','Open']
    }
    return(
        <Aux>
            <Backdrop clicked={props.closed} show={props.open}/>
            <div className={attachedClass.join(' ')} onClick={props.closed}>
                <div className='logo'>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated}/>
                </nav>
            </div>
        </Aux>

    )
};

export default sideDrawer;