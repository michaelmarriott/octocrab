import Configuration from '../config/Configuration';

const apiMiddleware = store => next => action => {  
    if (!action){
        console.log("MOCK_API_REQUEST"+action.type);
    }
    if (!action ||  (action.type !== "API_REQUEST" && action.type !== "API_REQUEST_FAIL")) {
        return next(action)
    }

    const config = action.fetchConfig;
    var path = `${config.path}`
    if(!config.path.startsWith('http')){
        if(config.urlType !== undefined && config.urlType == "Auth"){
            path = `${Configuration.authUrl}${config.path}`
        }else{
            path = `${Configuration.apiUrl}${config.path}`
        }
    }
    
    let method = config.method || "GET";
    let successHandler = config.successHandler;
    let failureHandler = config.failureHandler;
    let login = store.getState().loginReducer;
    var headers = config.header == "SECURE" ? authenicationHeaders(login.token) : headers(Configuration.audience);  

    var jsonBody;
    if(config.body !== undefined && config.body !== null){
        jsonBody = JSON.stringify(config.body)
    }

    var additionalReturnData =config.additionalReturnData;
    if(additionalReturnData === undefined){
        additionalReturnData = config.body;
    }
    
    let dispatch = store.dispatch;

    var FETCH_TIMEOUT = 90000;
    var timeoutPromise = function(timeout, err, promise) {
        return new Promise(function(resolve,reject) {
          promise.then(resolve,reject);
          setTimeout(reject.bind(null,err), timeout);
        });
    }
    console.log(path);
    console.log(JSON.stringify(jsonBody));
    return timeoutPromise(FETCH_TIMEOUT,new Error('Request timed out'),
        fetch(path, {
            method: method,
            headers: headers,
            body:jsonBody
        })
        .then(response=>{
            console.log("Got a response");
            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return Promise.all([response.json(),response.status]);
                }else{
                    return Promise.all([response.text(),response.status]);
                }
           }
           if(response.status == 204){
            return [{},response.status];
           }
           return Promise.all([response.json(),response.status]);
        })
        .then(([data,status])=>{ 
            console.log("Request Data:"+JSON.stringify(data) + status);  
            if (status < 400) {
               return data;
            }else{
                if(typeof(data) === 'object'){
                    data.IsError = true;
                    data.StatusCode = status;
                    return data;
                }else{
                    return createErrorObject(data, status);
                }
            }
        })
        .then(jsonData=>{
            if (jsonData.IsError){ 
                console.log("Request Error IsError:"+JSON.stringify(jsonData));  
                dispatch(failureHandler(jsonData, additionalReturnData));
            }else{   
                dispatch(successHandler(jsonData, additionalReturnData))}
            }
        )
        .catch(error => {
            console.log("request Error processing:"+JSON.stringify(error));   
            dispatch(failureHandler(createErrorObject(error, 501), additionalReturnData))
        })
    )
    .catch(error =>  {
        console.log("network.timeout");                     
         dispatch(failureHandler(createErrorObject(JSON.stringify(error), 504), additionalReturnData));
    });

     function createErrorObject(data, status){
         if(typeof(data) === 'string' && data.includes("<html>")){
            return  {IsError: true, Message: "Service is unavailable, please try again later",Other:null, StatusCode: status}
         }
         if(typeof(data) === 'object'){
            return  {IsError: true, Message: data.message, Other: data, StatusCode: status}
         }
        return  {IsError: true, Message: data, Other: data, StatusCode: status}
     }
     
    function authenicationHeaders(token) {
        return {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type':'application/json',
           
        };
    }
    
    function headers(audience) {
        return {
            'Accept': 'application/json',
            'Audience':''+audience,
            'Content-Type':'application/json'
        };
    }

};

export default apiMiddleware  
