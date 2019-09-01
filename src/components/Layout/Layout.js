import React,{useState} from 'react';

import { connect } from 'react-redux';

import Aux from '../../hoc/Aux1';
import './layout.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = props =>{
    const [sideDrawerIsVisible, setSideDrawerIsVisible] =useState(false);
    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };
     const toggleSideDrawerHandler = () => {
         setSideDrawerIsVisible(!sideDrawerIsVisible)
    };
        return(
            <Aux>
                <Toolbar isAuthenticated={props.isAuth} drawerToggleClicked={toggleSideDrawerHandler}/>
                <SideDrawer isAuthenticated = {props.isAuth} open={sideDrawerIsVisible} closed={sideDrawerClosedHandler}/>
                <main className='content'>
                    {props.children}
                </main>
            </Aux>
        )
}
const mapStateToProps = state => {
    return {
        isAuth : state.auth.idToken != null
    }
}
export default connect(mapStateToProps)(layout);