import React from 'react';

import './Input.scss';
const input = (props) =>{
  let inputElement = null;
  const inputClasses = ['InputElement'];
  if (props.invalid && props.validation && props.touched){
    inputClasses.push('invalid')
  }
  switch (props.elementType){
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
      break;
    case ('select'):
      inputElement =
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>{option.displayValue}</option>
          ))}
        </select>;
      break;
    case ('textarea'):
    inputElement = <textarea
      className={inputClasses.join(' ')}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed}
    />;
    break;
    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
      />;
        }
  return(
    <div className='Input'>
      <label className='Label'>{props.children}</label>
      {inputElement}
    </div>
  )
}

export default input;