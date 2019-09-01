import React,{ useEffect, useState } from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuilControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrederSummery from '../../components/Burger/OrderSummery/OrderSummery';
import axios from '../../axios-order';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreator from '../../Store/Actions/index';


const BurgerBuilder = props =>{
    const [purchasing, setPurchasing] = useState(false)
   useEffect(() =>{
       props.onInitIngredients();
   } , []);

    const updatePurchaseState = (ingredients) =>{
        const sum = Object.keys(ingredients)
            .map(igKey =>{
                return ingredients[igKey]
            })
            .reduce((sum,el) => {
                return sum + el;
            },0);
       return sum > 0

    };

    const purchaseHandler = () => {
        if(props.isAuthenticated){
            setPurchasing(true)
        }else {
          props.onSetAuthRedirectPath('/checkout');
          props.history.push('/auth');
        }
    };
    const purchaseCancelHandler = () => {
        setPurchasing(false)
    };
    const purchaseContinueHandler = () => {
        props.onPurchasedInit();
        props.history.push({pathname:'/checkout'});

    };

        const disabledInfo = {
            ...props.ing
        };
        let orderSummery = null;
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = props.error ?<p>Ingredient can't be laoded</p>: <Spinner/>;
        if(props.ing){
            burger =(
                <Aux>
                    <Burger ingredients={props.ing}/>
                    <BuildControls
                        ingredientsAdded = {props.onIngredientAdded}
                        ingredientsRemoved={props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        price={props.price}
                        isAuth={props.isAuthenticated}
                        purchasable={updatePurchaseState(props.ing)}
                        ordered={purchaseHandler}
                    />
                </Aux>
            );
            orderSummery =   <OrederSummery
                ingredients={props.ing}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinue={purchaseContinueHandler}
                price={props.price}
            />
        }

        return(
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummery}
                </Modal>
                {burger}
            </Aux>

        );
}
const mapStetToProps = state => {
    return{
      ing: state.burgerBulider.ingredients,
      price: state.burgerBulider.totalPrice,
      error:state.burgerBulider.error,
      isAuthenticated:state.auth.idToken != null,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded: ingName => dispatch(actionCreator.addIngredients(ingName)),
        onIngredientRemoved: ingName => dispatch(actionCreator.removeIngredients(ingName)),
        onInitIngredients : () => dispatch(actionCreator.initIngredients()),
        onPurchasedInit : () =>dispatch(actionCreator.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreator.setAuthRedirectPath(path))
    }
}

export default connect(mapStetToProps,mapDispatchToProps)(withErrorhandler(BurgerBuilder , axios));