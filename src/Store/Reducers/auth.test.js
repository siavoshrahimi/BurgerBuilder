import reducer from './auth';
import * as actionType from '../Actions/actionTypes';

describe('auth reducer', () =>{
  it('should return the initial state', () =>{
    expect(reducer(undefined, {})).toEqual({
      idToken:null,
      userId:null,
      error:null,
      loading:false,
      authRedirectPath:'/',
    });
  });
  it('should store token upon login', () =>{
    expect(reducer({
      idToken:null,
      userId:null,
      error:null,
      loading:false,
      authRedirectPath:'/',
    }, {
      type:actionType.AUTH_SUCCESS,
      idToken:'some-token',
      userId:'some-user-id'
    })).toEqual({
      idToken:'some-token',
      userId:'some-user-id',
      error:null,
      loading:false,
      authRedirectPath:'/',
    })
  })
});
