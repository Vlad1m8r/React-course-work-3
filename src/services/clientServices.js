import {
    ADD_CLIENT_ERROR,
    ADD_CLIENT_LOADING,
    ADD_CLIENT_SUCCESS,
    DELETE_CLIENT_LOADING,
    DELETE_CLIENT_ERROR,
    DELETE_CLIENT_SUCCESS,
    EDIT_CLIENT_LOADING,
    EDIT_CLIENT_ERROR,
    EDIT_CLIENT_SUCCESS,
    FETCH_CLIENT_ERROR,
    FETCH_CLIENT_SUCCESS,
    FETCH_CLIENT_LOADING,
} from "../reducers/clientReducer"

import axios from "axios";
import {history} from "../index";
// import {editClient, fetchUsersError, fetchUsersLoading, fetchUsersSuccess} from "./driverAction";

const CLIENT_REST_API_URL = 'http://localhost:8080/api/client';

//CREAT------------------------------------------------------------------
export const createClientSuccess = (data) => {
    return {
        type: ADD_CLIENT_SUCCESS,
        payload: data,
    }
}

export const createClientError = (data) => {
    debugger
    return {
        type: ADD_CLIENT_ERROR,
        payload: data,
    }
}

export const createClient = (client) => {

    debugger
    if (client.id) {
        const data = {
            id: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            phoneNumber: client.phoneNumber,
            ssn: client.ssn,
            email: client.email,
        }
        return (dispatch => {
            dispatch(editClient(data))
        })
    } else {
        const data = {
            id: client.id,
            firstName: client.firstName,
            lastName: client.lastName,
            phoneNumber: client.phoneNumber,
            ssn: client.ssn,
            email: client.email,
        }

        return (dispatch) => {
            return axios.post(CLIENT_REST_API_URL, data)
                .then(response => {

                    dispatch(createClientSuccess(response.data))
                    history.push('/clients')

                }).catch(error => {
                    dispatch(createClientError(error))
                })
        }
    }

}

//EDIT-------------------------------------------------------------------
export const editClientError = (data) => {
    return {
        type: EDIT_CLIENT_ERROR,
        payload: data,
    }
}

export const editClientSuccess = (data) => {
    return {
        type: EDIT_CLIENT_SUCCESS,
        payload: data,
    }

}

export const editClient = (data) => {
    const id = data.id
    return (dispatch) => {
        return axios.put(`${CLIENT_REST_API_URL}`, data)
            .then(() => {
                // history.push('/')
                return axios.get(`${CLIENT_REST_API_URL}/${id}`)
                    .then(response => {
                        dispatch(editClientSuccess(response.data))
                        history.push('/clients')
                    }).catch(error => {
                        debugger
                        const errorPayload = {}
                        errorPayload['message'] = error.response?.data
                        errorPayload['status'] = error.response?.status
                        dispatch(editClientError(errorPayload))
                    })
            }).catch(error => {
                debugger
                const errorPayload = {}
                errorPayload['message'] = error.response?.data
                errorPayload['status'] = error.response?.status
                dispatch(editClientError(errorPayload))
            })
    }
}


//DELETE-----------------------------------------------------------------
export const deleteClientSuccess = (data) => {
    return {
        type: DELETE_CLIENT_SUCCESS,
        payload: data,
    }
}
export const deleteClientError = (data) => {
    debugger
    return {
        type: DELETE_CLIENT_ERROR,
        payload: data,
    }
}

export const deleteClient = (id) => {
    return (dispatch) => {
        return axios.delete(`${CLIENT_REST_API_URL}/${id}`)
            .then(() => {
                dispatch(deleteClientSuccess(id))
            })
            .catch(error => {
                dispatch(deleteClientError(error))

            })
    }
}

//FETCH------------------------------------------------------------------
export const fetchClientsSuccess = (data) => {
    // debugger
    return {
        type: FETCH_CLIENT_SUCCESS,
        payload: data,
    }
}

export const fetchClientsLoading = (data) => {
    return {
        type: FETCH_CLIENT_LOADING,
        payload: data,
    }
}

export const fetchClientsError = (data) => {
    return {
        type: FETCH_CLIENT_ERROR,
        payload: data,
    }
}

export const fetchClients = () => {
    let isLoading = true
    return (dispatch) => {
        dispatch(fetchClientsLoading(isLoading))
        return axios.get(CLIENT_REST_API_URL)
            .then(response => {
                const data = response.data;
                dispatch(fetchClientsSuccess(data))
                isLoading = false;
                dispatch(fetchClientsLoading(isLoading))
            }).catch(error => {
                dispatch(fetchClientsError(error))
                isLoading = false
                dispatch(fetchClientsLoading(isLoading))
            })
    }
}