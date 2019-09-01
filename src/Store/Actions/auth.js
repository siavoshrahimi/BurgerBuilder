import * as actionType from './actionTypes';

/*DONE BY SAGA*/
export const authLogUot = () =>{
  return{
    type:actionType.AUTH_INITIATE_LOGOUT
  }
}
export const logoutSucceed = () =>{
  return{
    type:actionType.AUTH_LOUGUOT
  }
}
export const checkAuthTimeout = (expirationTime) =>{
  return{
    type: actionType.AUTH_TIMEOUT_SUCCEED,
    expirationTime:expirationTime
  }
}
export const authStart = () => {
  return{
    type:actionType.AUTH_START
  }
}

export const authSuccess = (idToken,userId) =>{
  return{
    type: actionType.AUTH_SUCCESS,
    idToken: idToken,
    userId:userId
  }
}
export const authFail = (error) => {
  return {
    type:actionType.AUTH_FAIL,
    error:error
  }
}
export const auth = (email, password ,isSignUp) =>{
  return{
    type:actionType.AUTH_USER,
    email:email,
    password:password,
    isSignUp:isSignUp
  }
}
export const setAuthRedirectPath = (path) => {
  return{
    type:actionType.SET_AUTH_REDIRECT_PATH,
    path:path
  }
};
export const authCheckState = () =>{
  return{
    type:actionType.AUTH_CHECK_STATE
  }
}