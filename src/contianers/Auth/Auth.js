import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actionCreator from '../../Store/Actions/index';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Buttun/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.scss';
const Auth = props =>{
  const [controls , setControls] = useState( {
      email:{
        elementType:'input',
        elementConfig:{
          type:'email',
          placeholder:'Your Email'
        },
        valid:false,
        validation:{
          required:true,
        },
        value:'',
        touched:false
      },
      password:{
        elementType:'input',
        elementConfig:{
          type:'password',
          placeholder:'password'
        },
        valid:false,
        validation:{
          required:true,
          minLength:6
        },
        value:'',
        touched:false
      }
    });
    const [isSignUp, setIsSignUp] = useState(true);
    useEffect(() =>{
      if(!props.building && props.authRedirectPath !== '/'){
        props.onSetRedirectPath();
      }
    }, []);

  const checkValidity = (value, rules) =>{
    let isValid = true;
    if (rules.required){
      isValid = value.trim() !== '' && isValid === true;
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid === true;
    }
    return isValid
  }
  const inputChangeHandler = (event, inputIdentifier) =>{
    const updatedControls = {
      ...controls
    }
    const updatedFormElement ={
      ...updatedControls[inputIdentifier]
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedControls[inputIdentifier] = updatedFormElement;
    setControls(updatedControls)
  }
  const authHandler = (event) =>{
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value,isSignUp)
  }
  const switchSignInHandler = () =>{
    setIsSignUp(!isSignUp)
    /*setState(prevState =>{
      return {isSignUp:!prevState.isSignUp}
    })*/
  }
    const formElementArray = [];
    for (let key in controls){
      formElementArray.push({
        id:key,
        config:controls[key]
      });
    }
    let form = formElementArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          validation={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) =>inputChangeHandler(event,formElement.id)}
        />
      ));
    if(props.loading){
      form = <Spinner/>
    }
    let error = null;
    if(props.error){
      error = (<p>{props.error}</p>)
    }
    let authRedirect = null;
    if(props.isAuthenticated ){
      authRedirect = <Redirect to={props.authRedirectPath} />
    }
    return (
        <div className='Auth'>
          {authRedirect}
          {error}
          <form onSubmit={authHandler}>
            {form}
            <Button btnType = "Success">SUBMIT</Button>
          </form>
          <Button
            btnType='Danger'
            clicked={switchSignInHandler}>
            Switch to {isSignUp? "Sign In":"Sign Up"}
            </Button>
        </div>
    )
}
const mapStateToProps = state =>{
  return{
    loading:state.auth.loading,
    error: state.auth.error,
    isAuthenticated:state.auth.idToken != null,
    authRedirectPath: state.auth.authRedirectPath,
    building:state.burgerBulider.building
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth:(email, password,isSignIn) => dispatch(actionCreator.auth(email, password,isSignIn)),
    onSetRedirectPath: () => dispatch(actionCreator.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);