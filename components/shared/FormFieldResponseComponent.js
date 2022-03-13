import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {formsStyles} from '../../styles/FormStyles';

const FormFieldResponseComponent = ({message, isError, shouldDisplay}) => {

    let display = {};

    if(!shouldDisplay){
        display = {
            width: 0,
            height: 0
        }
    }
    let displayMessage = message || "Ooops... an error has occurred"
    return (
        <Text style={StyleSheet.flatten([formsStyles.formFieldResponseText(isError), display])}>{displayMessage}</Text>
    );
};

export default FormFieldResponseComponent;