import { takeEvery } from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga,authUserSaga,authCheckStateSaga } from './auth';
import * as actionType from '../Actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(actionType.AUTH_INITIATE_LOGOUT,logoutSaga);
  yield takeEvery(actionType.AUTH_TIMEOUT_SUCCEED, checkAuthTimeoutSaga);
  yield takeEvery(actionType.AUTH_USER, authUserSaga);
  yield takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga);
}