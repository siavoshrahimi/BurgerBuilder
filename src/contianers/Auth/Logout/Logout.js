import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as actionCreator from '../../../Store/Actions/index';

const logout = props =>{
  useEffect(() =>{
    props.onLogoutAuth();
  })

    return(<Redirect to='/'/>)

}
const mapDispatchToProps = dispatch =>{
  return{
    onLogoutAuth: () => dispatch(actionCreator.authLogUot())
  }
}

export default connect(null,mapDispatchToProps)(logout)