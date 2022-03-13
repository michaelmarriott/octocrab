import { ServerApi } from '../api/ServiceList';

export const SETTINGS_EVENT_START = 'SETTINGS_EVENT_START';
export const SETTINGS_EVENT_SUCCESS = 'SETTINGS_EVENT_SUCCESS';
export const SETTINGS_EVENT_FAIL = 'SETTINGS_EVENT_FAIL';
export const SETTINGS_EVENT_RESET = 'SETTINGS_EVENT_RESET'

export function updateSettings(data){
    return dispatch => {
        dispatch(settingsStart());    
        dispatch(ServerApi.default.setServer(data, settingsSuccess, settingsFail));
     };  
}

export function settingsStart(){
    return {
        type: SETTINGS_EVENT_START
    }
}

export function settingsUpdate(data, additionalReturnData){
        dispatch({ 
            type: SETTINGS_EVENT_SUCCESS,
            data
        });
}

export function settingsSuccess(data, additionalReturnData){
    return { 
            type: SETTINGS_EVENT_SUCCESS,
            data
    }
}

export function settingsFail(error){
    return {
        type: SETTINGS_EVENT_FAIL,
        error:error
    }
}

export function settingsReset(){
    return {
        type: SETTINGS_EVENT_RESET
    }
}
