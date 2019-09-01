import React from 'react';

import './BuildControls.scss';
import BuilControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad' , type:'salad' },
    {label:'Bacon' , type:'bacon' },
    {label:'Meat' , type:'meat' },
    {label:'Cheese' , type:'cheese' }
];
const buildCotrols = (props) => (
    <div className='BuildControls'>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctr => (
            <BuilControl
                key={ctr.label}
                label={ctr.label}
                added={() => props.ingredientsAdded(ctr.type)}
                removed={() => props.ingredientsRemoved(ctr.type)}
                disabled={props.disabled[ctr.type]}
            />
        ))}
        <button
            className='OrderButton'
            disabled={!props.purchasable}
            onClick={props.ordered}
        >{props.isAuth?'ORDER NOW':'SIGN UP FIRST'}</button>
    </div>
)



export default buildCotrols;