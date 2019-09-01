import { put,delay } from 'redux-saga/effects';
import * as actionCreator from '../Actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
  yield   localStorage.removeItem('token');
  yield   localStorage.removeItem('expirationDate');
  yield   localStorage.removeItem('userId');
  yield   put(actionCreator.logoutSucceed());
}
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime*1000);
  yield put(actionCreator.authLogUot());
}
export function* authUserSaga(action) {
  yield put(actionCreator.authStart());
  const authData = {
    email:action.email,
    password: action.password,
    returnSecureToken:true
  }
  let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAseLXzVqsLLKliKvxp11KLql_ur0_F8EA";
  if(!action.isSignUp){
    url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAseLXzVqsLLKliKvxp11KLql_ur0_F8EA';
  }
  try {
    const res = yield axios.post(url, authData);
    const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', res.data.localId);
    yield put(actionCreator.authSuccess(res.data.idToken, res.data.localId));
    yield put(actionCreator.checkAuthTimeout(res.data.expiresIn))
  } catch(err){
    yield put(actionCreator.authFail(err.response.data.error.message));
  }

}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if(!token){
      yield put(actionCreator.authLogUot());
    }else{
      const expirationDate =yield new Date(localStorage.getItem('expirationDate'));
      const userId =yield localStorage.getItem('userId');
      if(new Date() > expirationDate){
        yield put(actionCreator.authLogUot());
      }else {
        yield put(actionCreator.authSuccess(token,userId));
        yield put(actionCreator.checkAuthTimeout( (expirationDate.getTime()- new Date().getTime()) / 1000))
      }
    }
}

