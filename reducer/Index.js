import {combineReducers} from 'redux';

import SettingsReducer from './SettingsReducer';

export default  combineReducers({
    settingsReducer: SettingsReducer
});