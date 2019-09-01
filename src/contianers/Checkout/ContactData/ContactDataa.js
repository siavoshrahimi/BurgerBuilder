import React,{useState} from 'react';

//button
import Button from '../../../components/UI/Buttun/Button';
//Input
import Input from '../../../components/UI/Input/Input';
//high order error handler
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

//css
import './ContactData.scss';
//axios
import axios from '../../../axios-order';

//spinner
import Spinner from '../../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
// action creators
import * as actionCreator from '../../../Store/Actions/index';


const contactData = props => {
    const [orderForm, setOrderForm] =useState({
            name:{
              elementType:'input',
              elementConfig:{
                type:'text',
                placeholder:'Your Name'
              },
              valid:false,
              validation:{
                  required:true,
              },
               value:'',
              touched:false
              },
              street:{
                elementType:'input',
                elementConfig:{
                  type:'text',
                  placeholder:'Street'
                },
                valid:false,
                validation:{
                  required:true
                },
                value:'',
                touched:false
              },
              zipCode: {
                elementType:'input',
                elementConfig:{
                  type:'text',
                  placeholder:'Zip Code'
                },
                valid:false,
                validation:{
                  required:true,
                  minLength:5,
                  maxLength:5
                },
                value:'',
                touched:false
              },
              country:{
                elementType:'input',
                elementConfig:{
                  type:'text',
                  placeholder:'Country'
                },
                valid:false,
                validation:{
                  required:true
                },
                value:'',
                touched:false
              },
              email:{
                elementType:'input',
                elementConfig:{
                  type:'email',
                  placeholder:'Your E-mail'
                },
                valid:false,
                validation:{
                  required:true
                },
                value:'',
                touched:false
              },
            deliveryMethod:{
              elementType:'select',
              elementConfig:{
                options:[
                  {value:'fastest' , displayValue:'Fastest'},
                  {value:'cheapest' , displayValue:'Cheapest'},
                ]
              },
              value:'fastest',
              validation:{},
              valid:true
            }
        });
    const [formValid , setFormValid] = useState(false);
    //take ingredients,price,address and loading status(for managing spinner) and send it to database
    const orderHandler =(event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm){
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
       const order = {
           ingredients: props.ing,
           price: props.price,
           orderData: formData,
           userId:props.userId
       };
       props.onOrderBurger(order,props.token);
    }
    const checkValidity = (value, rules) =>{
        let isValid = true;
        if (rules.required){
            isValid = value.trim() !== '' && isValid === true;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid === true;
        }
        if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid === true;
        }
        return isValid
    }
    const inputChangeHandler = (event, inputIdentifier) =>{
        const updatedOrderForm ={
          ...orderForm
        }
        const updatedFormElement = {
          ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;


        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm ){
          formIsValid = updatedOrderForm[inputIdentifier].valid ===true && formIsValid;
        }
        setFormValid(formIsValid);
        setOrderForm(updatedOrderForm);
    }
        //make an array from our orderForm object
        const formElementArray = [];
        for (let key in orderForm){
            formElementArray.push({
              id:key,
              config:orderForm[key]
            });
        }
        let form = (  <form onSubmit={orderHandler}>
            {formElementArray.map(formElement => (
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
            ))}
            <Button btnType='Success' disabled={!formValid}>ORDER</Button>
        </form>);
        if(props.loading){
            form = <Spinner/>
        }
        return(
            <div className='ContactData'>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
}
const mapStateToProps = state => {
  return {
    ing: state.burgerBulider.ingredients,
    price: state.burgerBulider.totalPrice,
    loading:state.order.loading,
    token:state.auth.idToken,
    userId:state.auth.userId,
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    onOrderBurger : (order, token) => {dispatch(actionCreator.purchaseBurger(order, token))}
  }
}

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(contactData, axios));