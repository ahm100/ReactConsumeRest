import * as actionTypes from './actionTypes';
import axios from '../../axios/aixos';
import * as errorHandlerActions from './errorHandlerActions';

const getDataSuccess = (data) => {
    return {
        type: actionTypes.GET_DATA_SUCCESS,
        data: data
    }
}

//const response = { status: 500 , message:'moshkel dakheli'};
//const fresponse = ()=>{ return { status: 500 , message:'moshkel dakheli'} };

// const myerr = {  
//     //response: response  // this is for case we use exactly an object not arrow function
//     response: fresponse()
// }
export const getData = (url, props) => {
    return (dispatch) => {
        axios.get(url)
            .then(response => {
                //alert('daryaft shode..');
                dispatch(getDataSuccess(response.data));
            })
            .catch(error => {
                //alert(error)
                dispatch(errorHandlerActions.handleHTTPError(error, props));

            })

        // dispatch(errorHandlerActions.handleHTTPError(myerr, props));
    }
}

const postDataSuccess = (response) => {
    return {
        type: actionTypes.POST_DATA_SUCCESS,
        response: response
    }
}

export const postData = (url, obj, props) => {
    return (dispatch) => {
        debugger;
        axios.post(url, obj)
            .then(response => {
                dispatch(postDataSuccess(response));
            })
            .catch(error => {
                dispatch(errorHandlerActions.handleHTTPError(error, props));

            })
    }
}

const putDataSuccess = (response) => {
    return {
        type: actionTypes.PUT_DATA_SUCCESS,
        response: response
    }
}

export const putData = (url, obj, props) => {
    return (dispatch) => {
        axios.put(url, obj)
            .then(response => {
                dispatch(putDataSuccess(response));
            })
            .catch(error => {
                dispatch(errorHandlerActions.handleHTTPError(error, props));

            })
    }
}

const deleteDataSuccess = (response) => {
    return {
        type: actionTypes.DELETE_DATA_SUCCESS,
        response: response
    }
}

export const deleteData = (url, props) => {
    return (dispatch) => {
        axios.delete(url)
            .then(response => {
                dispatch(deleteDataSuccess(response));
            })
            .catch(error => {
                dispatch(errorHandlerActions.handleHTTPError(error, props));
                //TODO: handle the error when implemented
            })
    }
}

export const closeSuccessModal = (props, url) => {
    return {
        type: actionTypes.CLOSE_SUCCESS_MODAL,
        props: props,
        url: url
    }
}