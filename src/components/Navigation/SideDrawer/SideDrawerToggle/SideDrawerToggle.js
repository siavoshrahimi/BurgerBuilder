import React from 'react';

import './SideDrawerToggle.scss';

const menu = (props) => (
    <div className='DrawerToggle' onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default menu;