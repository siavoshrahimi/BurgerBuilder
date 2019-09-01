import * as actionType from '../Actions/actionTypes';

const initialState ={
  idToken:null,
  userId:null,
  error:null,
  loading:false,
  authRedirectPath:'/',
}

const reducer = (state=initialState, action)=> {
  switch (action.type){
    case actionType.SET_AUTH_REDIRECT_PATH:
      return{
        ...state,
        authRedirectPath:action.path
      }
    case actionType.AUTH_START:
      return{
        ...state,
        error:null,
        loading:true
      }
    case actionType.AUTH_SUCCESS:
      return{
        ...state,
        idToken:action.idToken,
        error:null,
        loading:false,
        userId:action.userId,

      }
    case actionType.AUTH_FAIL:
      return{
        ...state,
        loading:false,
        error:action.error
      }
    case actionType.AUTH_LOUGUOT:
      return{
        ...state,
        loading:false,
        userId:null,
        idToken:null
      }
    default:
      return state
  }
}

export default reducer;