import React,{useEffect} from 'react';
//redux
import { connect } from 'react-redux';
//axios
import axios from '../../axios-order';
//error handling
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//actionCreator
import * as actions from '../../Store/Actions/index';
//spinner
import Spinner from '../../components/UI/Spinner/Spinner';

import Order from '../../components/Order/Order';
const order = props =>{

    useEffect(() =>{
        props.onFetchOrder(props.token, props.userId);
    },[]);
      let order = <Spinner/>;
      if(!props.loading){
        order = (
          props.order.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          ))
        )};
        return(
            <div>
              {order}
            </div>

        )
}
const mapStateToProps = state => {
  return {
    order: state.order.orders,
    loading: state.order.loading,
    token: state.auth.idToken,
    userId:state.auth.userId
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrder:(token,userId) => dispatch(actions.fetchOrder(token, userId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(order,axios));