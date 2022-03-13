import {colours} from './Colors';

export const formsStyles = {


    formField: (isError) => {
        return {
            flexDirection: "row",
            paddingHorizontal: 18,
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: 30,
            borderWidth: 1,
            borderColor: isError ? colours.errorRed : colours.lightGrey
        };
    },

    formFieldResponseText: (isError) => {
        return {
            paddingLeft: 18,
            fontSize: 12,
            color: isError ? colours.errorRed : colours.successGreen,
            marginTop: 5,
            marginBottom: 5
        }
    },

    formRow:{
        flex: 1,
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    formFieldContainer: {
        marginBottom: 15
    },

    formFieldInput: {
        paddingVertical: 16,
        marginLeft: 15,
        flex: 1,
        fontSize: 15
    },
    formFieldMiniInput: {
        paddingVertical: 16,
        marginLeft: 15,
        flex: 0.2,
        fontSize: 15
    },
    formFieldLargeInput:{
        paddingVertical: 16,
        marginLeft: 15,
        flex: 0.8,
        fontSize: 15
    },
    checkboxContainer: {
        width:"100%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginBottom: 15
    },

    checkbox: {
        flex: 1,
        width: "100%"
    },

    
    selectTextStyle: (isValid) => {
        return {
            color: isValid ? colours.fontColor : colours.textGrey,
            width: "100%",
            textAlign: "center",
            fontSize: 14
        }
    },

    selector: {
        width: "100%",
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colours.lightGrey,
        paddingHorizontal: 15,
        paddingVertical: 10
    },

    selectStyle: {
        backgroundColor: colours.white,
        borderRadius: 0,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        borderWidth: 0,
        paddingVertical: 10
    }
}