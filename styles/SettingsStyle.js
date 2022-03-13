import { Dimensions } from 'react-native';
import {colours} from './Colors';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export const settingStyles = {
    container: {
        backgroundColor: colours.white,
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20
    },

    scrollViewContainer: {
        width: "100%",
        backgroundColor: colours.backgroundColor
    },

    formContainer: {
        width: "100%",
        height: (SCREEN_HEIGHT - 20),
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical:20
    },
    logo: {
        width: 160,
        height: 115,
        marginTop: 30
    }

};