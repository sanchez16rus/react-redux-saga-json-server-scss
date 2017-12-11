import {combineReducers} from 'redux';
import Constants from '../consts';
import Helpers from '../helpers';

/*Reducers for dispatch actions for Users*/
const users = (state = [], action = {}) => {
    switch (action.type) {
      case Constants.GET_USERS_SUCCEEDED:
        return action.payload;
      case Constants.GET_USERS_FAILED:
        return { error: action.payload };
      case Constants.UPDATE_USER_SUCCEEDED:
        return Helpers.changeItemInArray(state, action.payload);
      case Constants.UPDATE_USER_FAILED:
        return { error: action.payload };
      
      default:
        return state;
    }       
  };

  /*Reducers for dispatch actions for single User*/
const userSingle = (state = {}, action = {}) => {
    switch (action.type) {
      case Constants.GET_USER_SUCCEEDED:
        return action.payload;
      case Constants.GET_USER_FAILED:
        return { error: action.payload };
      default:
        return state;
    }       
  };

  const initfilterInfoState = {
    searchingStr: '',
    page: 1,
    limit: 12,
    count: 0
  }
  
  const filterInfo = (state = initfilterInfoState, action = {}) => {
      switch (action.type) {
        case Constants.SET_FILTER_INFO:
        {
          return action.payload;
        }
        default:
          return state;
      }       
    };

  const rootReducer = combineReducers({
    users,
    userSingle,
    filterInfo
  });
    
  export default rootReducer;