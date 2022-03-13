import { 
    UPLOAD_FACIALREC_EVENT_START, UPLOAD_FACIALREC_EVENT_SUCCESS, UPLOAD_FACIALREC_EVENT_FAIL, UPLOAD_FACIALREC_EVENT_RESET,
    DOCUMENT_LIST_EVENT_START, DOCUMENT_LIST_EVENT_SUCCESS, DOCUMENT_LIST_EVENT_FAIL,DOCUMENT_LIST_EVENT_RESET,
    CUSTOMER_DOCUMENT_EVENT_START, CUSTOMER_DOCUMENT_EVENT_SUCCESS,CUSTOMER_DOCUMENT_EVENT_FAIL,CUSTOMER_DOCUMENT_EVENT_RESET,
    ADDRESS_FORM_EVENT_START, ADDRESS_FORM_EVENT_SUCCESS, ADDRESS_FORM_EVENT_FAIL, ADDRESS_FORM_EVENT_RESET
} from '../actions/CustomerActions';

import { 
    CUSTOMER_DOCUMENT_UPLOAD_EVENT_SUCCESS
} from '../actions/DocumentActions';

let initialState = {

    isUploadFacialRecStarted: false,
    isUploadFacialRec: false,
    isUploadFacialRecFailed:false,
    uploadFacialRecMessage:null,
   
    isDocumentListStarted: false,
    isDocumentList: false,
    isDocumentListFailed:false,
    documentListError:null,
    customerDocumentTypes:[],

    isCustomerDocumentStarted: false,
    isCustomerDocument: false,
    isCustomerDocumentFailed:false,
    customerDocumentError:null,

};

export default (state = initialState, action) => {
    switch (action.type) {
       
        
        case CUSTOMER_DOCUMENT_UPLOAD_EVENT_SUCCESS:{
            console.log("CustomerReducer: CUSTOMER_DOCUMENT_UPLOAD_EVENT_SUCCESS");
            console.log(JSON.stringify(action.document));
            console.log(JSON.stringify(action.data));
            let uploadFacialRecMessage = null;
            let isUploadFacialRecFailed = true;
            if(action.data != undefined){
                if(action.data != undefined && action.data.result == "FAILURE"){
                    uploadFacialRecMessage = {IsError: true, Message: action.data.description, Other: action.data, StatusCode: 0}
                }else{
                    uploadFacialRecMessage = {IsError: false, Message: action.data.description, Other: action.data, StatusCode: 0}
                }
            }
            return { 
                ...state, 
                uploadFacialRecMessage: uploadFacialRecMessage,
                isUploadFacialRecFailed: isUploadFacialRecFailed,
                customerDocumentTypes: state.customerDocumentTypes.map(
                    (item, i) => item.Name === action.document.DocumentType ? {...item, Exists: true} : item
                )
             }
             //DateUploaded?
        }
        case UPLOAD_FACIALREC_EVENT_START:{
            console.log("UPLOAD_FACIALREC_EVENT_START");
            return Object.assign({}, state, {
                isUploadFacialRecStarted: true,
                isUploadFacialRec: false,
                isUploadFacialRecFailed:false,
                uploadFacialRecMessage:null
            });
        }
        case UPLOAD_FACIALREC_EVENT_SUCCESS:{
            console.log("UPLOAD_FACIALREC_EVENT_SUCCESS");
            return Object.assign({}, state, {
                isUploadFacialRecStarted: false,
                isUploadFacialRec: true,

                isUploadFacialRecFailed:false,
                uploadFacialRecMessage:null
            });
        }
        case UPLOAD_FACIALREC_EVENT_FAIL:{
            console.log("UPLOAD_FACIALREC_EVENT_FAIL");
            return Object.assign({}, state, {
                isUploadFacialRecStarted: false,
                isUploadFacialRec: false,
                isUploadFacialRecFailed:true,
                uploadFacialRecMessage:action.error
            });
        }
        case UPLOAD_FACIALREC_EVENT_RESET:{
            console.log("UPLOAD_FACIALREC_EVENT_RESET");
            return Object.assign({}, state, {
                isUploadFacialRecStarted: false,
                isUploadFacialRec: false,
                isUploadFacialRecFailed:false,
                uploadFacialRecMessage:null
            });
        }
        case DOCUMENT_LIST_EVENT_START:{
            console.log("DOCUMENT_LIST_EVENT_START");
            return Object.assign({}, state, {
                isDocumentListStarted: true,
                isDocumentList: false,
                isDocumentListFailed:false,
                documentListError:null
            });
        }
        case DOCUMENT_LIST_EVENT_SUCCESS:{
            console.log("DOCUMENT_LIST_EVENT_SUCCESS");
            return Object.assign({}, state, {
                isDocumentListStarted: false,
                isDocumentList: true,
                customerDocumentTypes: action.data,
                isDocumentListFailed:false,
                documentListError:null
            });
        }
        case DOCUMENT_LIST_EVENT_FAIL:{
            console.log("DOCUMENT_LIST_EVENT_FAIL");
            return Object.assign({}, state, {
                isDocumentListStarted: false,
                isDocumentList: false,
                isDocumentListFailed:true,
                documentListError:action.error
            });
        }
        case DOCUMENT_LIST_EVENT_RESET:{
            console.log("DOCUMENT_LIST_EVENT_RESET");
            return Object.assign({}, state, {
                isDocumentListStarted: false,
                isDocumentList: false,
                isDocumentListFailed:false,
                documentListError:null
            });
        }
        case CUSTOMER_DOCUMENT_EVENT_START:{
            console.log("CUSTOMER_DOCUMENT_EVENT_START");
            return Object.assign({}, state, {
                isCustomerDocumentStarted: true,
                isCustomerDocument: false,
                isCustomerDocumentFailed:false,
                customerDocumentError:null,
                uploadFacialRecMessage: null
            });
        }
        case CUSTOMER_DOCUMENT_EVENT_SUCCESS:{
            console.log("CUSTOMER_DOCUMENT_EVENT_SUCCESS");
            return {...state, 
                customerDocumentTypes: state.customerDocumentTypes.map(
                    (item, i) => checkIfMatch(item.Name, action.data) ? {...item, Exists: true} : item
                )
            };
        }
        case CUSTOMER_DOCUMENT_EVENT_FAIL:{
            console.log("CUSTOMER_DOCUMENT_EVENT_FAIL");
            return Object.assign({}, state, {
                isCustomerDocumentStarted: false,
                isCustomerDocument: false,
                isCustomerDocumentFailed:true,
                customerDocumentError:action.error,
                uploadFacialRecMessage: null
            });
        }
        case CUSTOMER_DOCUMENT_EVENT_RESET:{
            console.log("CUSTOMER_DOCUMENT_EVENT_RESET");
            return Object.assign({}, state, {
                isCustomerDocumentStarted: false,
                isCustomerDocument: false,
                isCustomerDocumentFailed:false,
                customerDocumentError:null,
                uploadFacialRecMessage: null
            });
        }
        default:
            return state;
    }

    function checkIfMatch(name,data){
        console.log("checkIfMatch");
        var isFound = false;
        data.forEach(function(entry) {
            if(name == entry.Name){
                isFound = true;
            }
        });
        return isFound;
    }

}