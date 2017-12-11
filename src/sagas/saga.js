import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';
import Constants from '../consts';

const urlConfig = () => ({
    apiUsersUrl: 'http://localhost:3000/users'
});

/*GET_USERS*/
export function* getUsersAsync(action) {
  try {
    const filteInfo = action.payload;

    let urlStr = urlConfig().apiUsersUrl+"?_limit="+filteInfo.limit;

    urlStr = urlStr+"&_page="+filteInfo.page;

    if(filteInfo.searchingStr)
    {
      urlStr = urlStr+"&name="+filteInfo.searchingStr;
    }
    console.log(urlStr);
    const response = yield call(axios.get, urlStr);
    yield put({ type: Constants.GET_USERS_SUCCEEDED, payload: response.data });
    
    filteInfo.count = response.data.length;
    yield put({ type: Constants.SET_FILTER_INFO, payload: filteInfo });
  } catch (e) {
    yield put({ type: Constants.GET_USERS_FAILED, payload: e.message });
  }
}
  
export function* watchGetUsers() {
  yield takeEvery(Constants.GET_USERS, getUsersAsync);
}

/*GET_USER*/
export function* getUserAsync(action) {
  try {
    const response = yield call(axios.get, urlConfig().apiUsersUrl+"/"+action.payload);
    yield put({ type: Constants.GET_USER_SUCCEEDED, payload: response.data });
  } catch (e) {
    yield put({ type: Constants.GET_USER_FAILED, payload: e.message });
  }
}
  
export function* watchGetUserSingle() {
  yield takeEvery(Constants.GET_USER, getUserAsync);
}

/*UPDATE_USER*/
export function* updateUserAsync(action) {
  try {
    const response = yield call(axios.put, urlConfig().apiUsersUrl+"/"+action.payload.id, action.payload);

    yield put({ type: Constants.UPDATE_USER_SUCCEEDED, payload: response.data });
  } catch (e) {
    yield put({ type: Constants.UPDATE_USER_FAILED, payload: e.message });
  }
}
  
export function* watchUpdateUser() {
  yield takeEvery(Constants.UPDATE_USER, updateUserAsync);
}