import Constants from '../consts';

export default {
    getUsersAction: (value) => ({ type: Constants.GET_USERS, payload: value }),
    getUserAction: (value) => ({ type: Constants.GET_USER, payload: value }),
    updateUserAction: (value) => ({ type: Constants.UPDATE_USER, payload: value })
}