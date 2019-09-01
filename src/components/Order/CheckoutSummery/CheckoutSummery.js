import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Buttun/Button';

import './CheckoutSummery.scss';

const CheckoutSummery = (props) => {
    return(
        <div className='CheckoutSummery'>
            <h1>It sames delicious</h1>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                btnType='Danger'
                clicked={props.checkoutCanceled}
            >
                CANCEL</Button>
            <Button
                btnType='Success'
                clicked={props.checkoutContinued}
            >CONTINUE</Button>
        </div>
    )

};

export default CheckoutSummery;