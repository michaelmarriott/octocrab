import Configuration from '../../config/Configuration';

class SettingsApi {

        static changeSettings(data, successHandler, failureHandler)
        {
            let body= data;
            console.log("AccountServiceApi::changePassword" + JSON.stringify(body));
            return {
                type: "API_REQUEST",
                fetchConfig: {
                    path: `ChangePassword`,
                    method: "PUT",
                    urlType:"Auth",
                    body: body,
                    successHandler: successHandler,
                    failureHandler: failureHandler
                }
            }
        };
    
    }
export default SettingsApi;

