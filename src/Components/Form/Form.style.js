import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    form: {
        flex: 1,
        marginTop: 100,
        marginHorizontal: 20,
        flexDirection: 'column',
    },
    formBox: {
        width: '100%',
        height: 85,
    },
    label: {
        marginVertical: 8,
        fontWeight: 'bold'
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    errorText: {
        color: 'red',

    },
    submitButton: {
        padding: 10,
        backgroundColor: '#202646',
        borderRadius: 5,
        marginTop: 20,
    },

    buttonContentContainer: {
        width: '100%',
        alignItems: 'center'

    },

    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    formPicker: {
        marginVertical: 20,
    }


});