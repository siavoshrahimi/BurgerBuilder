import React, { useEffect ,lazy,Suspense } from 'react';

import { Route,Switch,withRouter,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Layout from './components/Layout/Layout';
import BurgerBuilder from './contianers/BurgerBuilder/BurgerBuilder';
import * as acitonCreator from './Store/Actions/index';
import Spinner from './components/UI/Spinner/Spinner';

const Auth = lazy(() => import ('./contianers/Auth/Auth'));
const Checkout = lazy(() => import ('./contianers/Checkout/Checkout'));
const Orders = lazy(() => import ('./contianers/Orders/Orders'));
const Logout = lazy(() => import ("./contianers/Auth/Logout/Logout"));

const app = props =>{
  useEffect(() =>{
      props.onTryAutoSignup();
  },[]);


    let Routes = (
          <Switch>
            <Route path='/auth' component={Auth}/>
            <Route path='/' exact component={BurgerBuilder}/>
            <Redirect to='/'/>
          </Switch>
    );
    if(props.isAuthenticated){
      Routes = (
            <Switch>
              <Route path='/checkout' component={Checkout}/>
              <Route path='/orders' component={Orders}/>
              <Route path='/auth' component={Auth}/>
              <Route path='/logout' component={Logout}/>
              <Route path='/' exact component={BurgerBuilder}/>
              <Redirect to='/'/>
            </Switch>
      );
    }
    return (
      <div >
          <Layout>
              <Suspense fallback={<Spinner/>}>
                  {Routes}
              </Suspense>

          </Layout>
      </div>
    );
}
const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.idToken
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup : () => dispatch(acitonCreator.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(app));
