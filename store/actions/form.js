import * as actionTypes from './actionTypes';
import { AsyncStorage } from 'react-native';

export const setSSN = (SSN) => {
    AsyncStorage.setItem(
        'SSN',
        JSON.stringify(SSN),
    )
    return {
        type: actionTypes.SET_SSN,
        SSN: SSN
    }
}

export const setPhone = (phone) => {
    AsyncStorage.setItem(
        'phone',
        JSON.stringify(phone),
    )
    return {
        type: actionTypes.SET_PHONE,
        phone: phone
    }
}

export const setMail = (mail) => {
    AsyncStorage.setItem(
        'mail',
        JSON.stringify(mail),
    )
    return {
        type: actionTypes.SET_MAIL,
        mail: mail
    }
}

export const setCountry = (country) => {
    return {
        type: actionTypes.SET_COUNTRY,
        country: country
    }
}

