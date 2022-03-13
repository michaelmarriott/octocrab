

const fetchMiddleware = store => next => action => {  
    if (!action || !action.fetchConfig || action.type !== "MOCK_API_REQUEST") {
        return next(action)
    }
    console.log("MOCK_API_REQUEST");
    let dispatch = store.dispatch
    let config = action.fetchConfig
    let delay = 1000;
    const successHandler = config.successHandler;
    const failureHandler = config.failureHandler;
    const successData = config.successData;
    
    const failureData = config.failureData;
    const isSuccess = config.isSuccess;

    var additionalReturnData =config.additionalReturnData;

    if(additionalReturnData === undefined){
        additionalReturnData = config.body;
    }
   
    if(isSuccess){
        console.log('successful mock middleware');
       return setTimeout(function(){ dispatch(successHandler(successData,additionalReturnData)) }, delay);
       
    }else{
        return setTimeout(function(){ dispatch(failureHandler(failureData,additionalReturnData)) }, delay);

    }
}

export default fetchMiddleware  