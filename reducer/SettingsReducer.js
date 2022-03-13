import { SETTINGS_EVENT_START, SETTINGS_EVENT_SUCCESS, SETTINGS_EVENT_FAIL,SETTINGS_EVENT_RESET,
} from '../actions/SettingActions';

let initialState = {
    isSettingsStarted: false,
    isSettings: false,
    isSettingsFailed:false,
    settingsError:null
};

export default (state = initialState, action) => {
    switch (action.type) {
       
        case SETTINGS_EVENT_START:{
            console.log("SETTINGS_EVENT_START");
            return Object.assign({}, state, {
                isSettingsStarted: true,
                isSettings: false,
                isSettingsFailed:false,
                settingsError:null
            });
        }
        case SETTINGS_EVENT_SUCCESS:{
            console.log("SETTINGS_EVENT_SUCCESS");
            return Object.assign({}, state, {
                isSettingsStarted: false,
                isSettings: true,
                isSettingsFailed:false,
                settingsError:null
            });
        }
        case SETTINGS_EVENT_FAIL:{
            console.log("SETTINGS_EVENT_FAIL");
            return Object.assign({}, state, {
                isSettingsStarted: false,
                isSettings: false,
                isSettingsFailed:true,
                settingsError:action.error
            });
        }
        case SETTINGS_EVENT_RESET:{
            console.log("SETTINGS_EVENT_RESET");
            return Object.assign({}, state, {
                isSettingsStarted: false,
                isSettings: false,
                isSettingsFailed:false,
                settingsError:null
            });
        }
     
        default:
            return state;
    }


}