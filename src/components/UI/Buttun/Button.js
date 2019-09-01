import React from 'react';
import './Button.scss';

const Button = (props) => {
    let classArray = ['Button'];
    classArray.push(props.btnType);
    const classString = classArray.join(' ');

    return <button className={classString}
                   disabled={props.disabled}
                   onClick={props.clicked}>{props.children}</button>
};

export default Button
