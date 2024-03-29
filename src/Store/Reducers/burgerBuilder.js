import * as actionType from '../Actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice:4,
  error:false,
  building:false,
}

const INGREDIENTS_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat:1.3,
  bacon:0.7
};

const reducer = (state = initialState, action) =>{
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return{
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
        building:true

      }

    case actionType.REMOVE_INGREDIENT:
      return{
        ...state,
        ingredients:{
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
        building:true

      }
    case actionType.SET_INGREDIENTS:
      return{
        ...state,
        ingredients:action.ingredients,
        error:false,
        totalPrice:4,
        building:false,
      }
    case actionType.FETCH_INGREDIENTS_FAILED:
      return{
        ...state,
        error:true,
      }

    default:
      return state
  }
}

export default reducer;