import Configuration from '../config/global';

export default class ApiUtil {

    static handleJsonResponse(response) {
        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return Promise.all([response.json(),response.status]);
            }else{
                return Promise.all([response.text(),response.status]);
            }
       }
       return Promise.all([response.json(),response.status]);
    }

    static handleDataError(data, statusCode) {
        console.log("ApiUtil.handleDataError"+data);
        return this.createErrorObject(data, statusCode);
    }

    static handleServerError(error, statusCode) {

        console.log("ApiUtil.handleServerError:"+JSON.stringify(error) +":"+ statusCode);
        if(error !== undefined && error.IsError===true){
            return error;
        }
        return this.createErrorObject( "Oops, something went wrong.", 500);
    }

    static handleResponseData(data,status) {
      //  console.log("ApiUtil.handleResponseData:"+JSON.stringify(data) +":"+ status);
     // console.log('whatever ', data);
        if (status < 400) {
            return data;
        }else{
            if(typeof data === 'object'){
                data.IsError = true;
                return data;
            }else{
                return this.createErrorObject(data, status);
            }
        }
    }

    static createErrorObject(data, status){
       return  {IsError: true, ErrorDescription: data, StatusCode: status}
    }

    static authenicationHeaders(token) {
        return {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ token,
            'Content-Type':'application/json',
            "AppVersion": Configuration.majorMinorVersion + '.' + Configuration.versionNumber
        };
    }
    
    static headers() {
        return {
            'Accept': 'application/json',
            'Content-Type':'application/json',
            "AppVersion": Configuration.majorMinorVersion + '.' + Configuration.versionNumber
        };
    }

}