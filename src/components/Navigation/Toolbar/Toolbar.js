import React from 'react';

import './Toolbar.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../SideDrawer/SideDrawerToggle/SideDrawerToggle';


const toolbar = (props) => (
    <header className='Toolbar'>
        <Menu clicked={props.drawerToggleClicked}/>
        <div className='toolbarLogo'>
            <Logo/>
        </div>
        <nav className='DesktopOnly'>
            <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
     </header>
)

export default toolbar;