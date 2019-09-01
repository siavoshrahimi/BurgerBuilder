import React from 'react';

import {connect} from 'react-redux';

//rout
import {Route,Redirect} from 'react-router-dom';
//component
import ContactData from './ContactData/ContactDataa';
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';



const checkout = props =>{
    const checkoutCancelHandler = () => {
        props.history.goBack()
    };
    const checkoutcontinueHnadler = () => {
        props.history.replace('/checkout/contact-data')
    }
        let summary = <Redirect to='/' />;
        if (props.ing){
            const purchasedRedirect = props.purchased ? <Redirect to='/' /> : null;
            summary = (
              <div>
                {purchasedRedirect}
                <CheckoutSummery
                  ingredients={props.ing}
                  checkoutCanceled={checkoutCancelHandler}
                  checkoutContinued={checkoutcontinueHnadler} />
                <Route
                  path={props.match.path + '/contact-data'}
                  component={ContactData}
                />
              </div>

            )
        }
        return summary
}
const mapStateToProps =  state =>{
    return {
        ing: state.burgerBulider.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(checkout);


