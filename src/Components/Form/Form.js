import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    AsyncStorage,
    Picker,
    TouchableOpacity,
    Alert
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

import styles from './Form.style';
import * as actions from '../../../store/actions/form';
import {
    socialSecurityNumber,
    email,
    required,
    swePhoneNumber
} from './formValidation/formValidation';


const Form = props => {

    const [countryArray, setCountryArray] = useState([]);
    const [SSNErrorText, setSSNErrorText] = useState('Required Field');
    const [phoneErrorText, setPhoneErrorText] = useState('Required Field');
    const [mailErrorText, setMailErrorText] = useState('Required Field');

    useEffect(() => {
        getFormCountries();
        getStoredData();
    }, []);

    getFormCountries = async () => {
        try {
            const response = await axios.get('https://restcountries.eu/rest/v2/all')
            response.data.map(req => {
                setCountryArray(countryArray => [...countryArray, req.name]);
            })
        } catch (error) {
            console.error(error)
        }
    }

    getStoredData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            result.map(req => {
                parsedValue = JSON.parse(req[1])
                if (req[0] === "SSN" && parsedValue) {
                    props.onSetSSN(parsedValue);
                    checkSSNInput(parsedValue);
                }

                if (req[0] === "phone" && parsedValue) {
                    props.onSetPhone(parsedValue);
                    checkPhoneInput(parsedValue);
                }

                if (req[0] === "mail" && parsedValue) {
                    props.onSetMail(parsedValue);
                    checkMailInput(parsedValue);
                }

            });
        } catch (error) {
            console.error(error)
        }
    }

    checkSSNInput = text => {
        const reqValidation = required(text);
        const SSNValidation = socialSecurityNumber(text);
        if (reqValidation) {
            setSSNErrorText(reqValidation)
        } else if (SSNValidation) {
            setSSNErrorText(SSNValidation)
        } else {
            setSSNErrorText('')
        }
    }


    SSNChangeHandler = text => {
        checkSSNInput(text);
        props.onSetSSN(text);

    }

    checkPhoneInput = text => {
        const reqValidation = required(text);
        const phoneValidation = swePhoneNumber(text);
        if (reqValidation) {
            setPhoneErrorText(reqValidation)
        } else if (phoneValidation) {
            setPhoneErrorText(phoneValidation)
        } else {
            setPhoneErrorText('')
        }

    }

    phoneChangeHandler = text => {
        checkPhoneInput(text);
        props.onSetPhone(text);
    }

    checkMailInput = text => {
        const reqValidation = required(text);
        const mailValidaiton = email(text);
        if (reqValidation) {
            setMailErrorText(reqValidation)
        } else if (mailValidaiton) {
            setMailErrorText(mailValidaiton)
        } else {
            setMailErrorText('')
        }
    }


    mailChangeHandler = text => {
        checkMailInput(text);
        props.onSetMail(text);
    }

    submitHandler = () => {
        if (!SSNErrorText && !phoneErrorText && !mailErrorText) {
            AsyncStorage.removeItem("SSN")
            AsyncStorage.removeItem("phone")
            AsyncStorage.removeItem("mail")
            console.log("Success")
        } else {
            Alert.alert("Invalid Input!", "Check errors in form")
        }

    }

    return (
        <View style={styles.form}>
            <View style={styles.formBox}>
                <Text style={styles.label}>Social security number</Text>
                <TextInput style={styles.input} value={props.SSN} onChangeText={text => SSNChangeHandler(text)} />
                {SSNErrorText ? <Text style={styles.errorText}>{SSNErrorText}</Text> : null}
            </View>
            <View style={styles.formBox}>
                <Text style={styles.label}>Phone number</Text>
                <TextInput style={styles.input} value={props.phone} onChangeText={text => phoneChangeHandler(text)} />
                {phoneErrorText ? <Text style={styles.errorText}>{phoneErrorText}</Text> : null}
            </View>
            <View style={styles.formBox}>
                <Text style={styles.label}>Email address</Text>
                <TextInput style={styles.input} value={props.mail} onChangeText={text => mailChangeHandler(text)} />
                {mailErrorText ? <Text style={styles.errorText}>{mailErrorText}</Text> : null}
            </View>
            <View style={styles.formPicker}>
                <Text style={styles.label}>Country</Text>
                <Picker selectedValue={props.country} onValueChange={itemValue => props.onSetCountry(itemValue)}>
                    {countryArray.map(country => {
                        return <Picker.Item label={country} value={country} key={country} />
                    })}

                </Picker>
            </View>
            <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={.7}
                onPress={submitHandler}>
                <View style={styles.buttonContentContainer}>
                    <Text style={styles.buttonText}>Submit</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const mapStateToProps = state => ({
    SSN: state.SSN,
    phone: state.phone,
    mail: state.mail,
    country: state.country,
})

const mapDispatchToProps = dispatch => ({
    onSetSSN: (SSN) => dispatch(actions.setSSN(SSN)),
    onSetPhone: (phone) => dispatch(actions.setPhone(phone)),
    onSetMail: (mail) => dispatch(actions.setMail(mail)),
    onSetCountry: (country) => dispatch(actions.setCountry(country)),
})



export default connect(mapStateToProps, mapDispatchToProps)(Form);