import * as actionType from './actionTypes';

import axios from '../../axios-order';

export const purchaseInit = () => {
  return{
    type:actionType.PURCHASE_INIT
  }
}
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type:actionType.PURCHASE_BURGER_SUCCESS,
    orderId:id,
    orderData:orderData
  }
}
export const purchaseBurgerFail = (error) => {
  return {
    type:actionType.PURCHASE_BURGER_FAIL,
    error:error
  }
}
export const purchaseBurgerStart = () =>{
  return{
    type: actionType.PURCHASE_BURGER_START
  }
}
export const purchaseBurger = (orderData,token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios.post('/order.json?auth=' + token , orderData)
      .then(res => {
        dispatch(purchaseBurgerSuccess(res.data.name,orderData))
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err))
      })
  }
}

export const fetchOrderStart = () =>{
  return {
    type: actionType.FETCH_ORDER_START
  }
}
export const fetchOrderSuccess = (order) =>{
  return {
    type: actionType.FETCH_ORDER_SUCCESS,
    order: order
  }
}
export const fetchOrderFail = (error) =>{
  return {
    type: actionType.FETCH_ORDER_FAIL,
    error:error
  }
}
export const fetchOrder = (token , userId) => {
  return dispatch => {
    dispatch(fetchOrderStart());
    const queryParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/order.json' + queryParams)
      .then(res=>{
        const fetchedOrder = [];
        for(let key in res.data){
          fetchedOrder.push({
            ...res.data[key],
            id:key
          })
        }
        dispatch(fetchOrderSuccess(fetchedOrder))
      })
      .catch(err =>{
        dispatch(fetchOrderFail(err))
      })
  }
}