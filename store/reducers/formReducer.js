import * as actionTypes from '../actions/actionTypes';
import { AsyncStorage } from 'react-native';

const intialState = {
    SSN: '',
    phone: '',
    mail: '',
    country: '',
}

const formReducer = (state = intialState, action) => {

    switch (action.type) {
        case actionTypes.SET_SSN: {
            return {
                ...state,
                SSN: action.SSN
            }
        }
        case actionTypes.SET_PHONE: {
            return {
                ...state,
                phone: action.phone
            }
        }
        case actionTypes.SET_MAIL: {
            return {
                ...state,
                mail: action.mail
            }
        }
        case actionTypes.SET_COUNTRY: {
            return {
                ...state,
                country: action.country
            }
        }
    }
    return state;
}

export default formReducer;