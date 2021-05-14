import {
    ADD_CONTRACT_ERROR,
    ADD_CONTRACT_LOADING,
    ADD_CONTRACT_SUCCESS,
    DELETE_CONTRACT_LOADING,
    DELETE_CONTRACT_ERROR,
    DELETE_CONTRACT_SUCCESS,
    EDIT_CONTRACT_LOADING,
    EDIT_CONTRACT_ERROR,
    EDIT_CONTRACT_SUCCESS,
    FETCH_CONTRACT_ERROR,
    FETCH_CONTRACT_SUCCESS,
    FETCH_CONTRACT_LOADING,
} from "../reducers/contractReducer"

import axios from "axios";
import {history} from "../index";
// import {editContract, fetchUsersError, fetchUsersLoading, fetchUsersSuccess} from "./driverAction";

const CONTRACT_REST_API_URL = 'http://localhost:8080/api/contract';

//CREAT------------------------------------------------------------------
export const createContractSuccess = (data) => {
    return {
        type: ADD_CONTRACT_SUCCESS,
        payload: data,
    }
}

export const createContractError = (data) => {
    debugger
    return {
        type: ADD_CONTRACT_ERROR,
        payload: data,
    }
}

export const createContract = (contract) => {

    debugger
    if (contract.id) {
        const data = {
            id: contract.id,
            number: contract.number,
            dateStart: contract.dateStart,
            dateEnd: contract.dateEnd,
            client: {id: contract.client.id || contract.client},
            car: {id : contract.car.id || contract.car},
        }
        return (dispatch => {
            dispatch(editContract(data))
        })
    } else {
        const data = {
            number: contract.number,
            dateStart: contract.dateStart,
            dateEnd: contract.dateEnd,
            client: {id: contract.client.id || contract.client},
            car: {id : contract.car.id || contract.car},
        }

        return (dispatch) => {
            return axios.post(CONTRACT_REST_API_URL, data)
                .then(response => {

                    dispatch(createContractSuccess(response.data))
                    history.push('/contracts')

                }).catch(error => {
                    console.log(error)
                    const errorPayload = {}
                    errorPayload['message'] = error.response?.data
                    errorPayload['status'] = error.response?.status
                    dispatch(createContractError(errorPayload))
                })
        }
    }

}

//EDIT-------------------------------------------------------------------
export const editContractError = (data) => {
    return {
        type: EDIT_CONTRACT_ERROR,
        payload: data,
    }
}

export const editContractSuccess = (data) => {
    return {
        type: EDIT_CONTRACT_SUCCESS,
        payload: data,
    }

}

export const editContract = (data) => {
    const id = data.id
    return (dispatch) => {
        // return fetch(`${USERS_REST_API_URL}/${id}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(data)
        // }).then(response => {
        return axios.put(`${CONTRACT_REST_API_URL}/${id}`, data)
            .then(() => {
                // history.push('/')
                return axios.get(`${CONTRACT_REST_API_URL}/${id}`)
                    .then(response => {
                        dispatch(editContractSuccess(response.data))
                        history.push('/contracts')
                    }).catch(error => {
                        // debugger
                        const errorPayload = {}
                        errorPayload['message'] = error.response?.data
                        errorPayload['status'] = error.response?.status
                        dispatch(editContractError(errorPayload))
                    })
            }).catch(error => {
                // debugger
                const errorPayload = {}
                errorPayload['message'] = error.response?.data
                errorPayload['status'] = error.response?.status
                dispatch(editContractError(errorPayload))
            })
    }
}


//DELETE-----------------------------------------------------------------
export const deleteContractSuccess = (data) => {
    return {
        type: DELETE_CONTRACT_SUCCESS,
        payload: data,
    }
}
export const deleteContractError = (data) => {
    debugger
    return {
        type: DELETE_CONTRACT_ERROR,
        payload: data,
    }
}

export const deleteContract = (id) => {
    return (dispatch) => {
        return axios.delete(`${CONTRACT_REST_API_URL}/${id}`)
            .then(() => {
                dispatch(deleteContractSuccess(id))
            })
            .catch(error => {
                // debugger
                const errorPayload = {}
                errorPayload['message'] = error.response?.data?.message?.message
                errorPayload['status'] = error.response?.status
                dispatch(deleteContractError(errorPayload))

            })
    }
}

//FETCH------------------------------------------------------------------
export const fetchContractsSuccess = (data) => {
    // debugger
    return {
        type: FETCH_CONTRACT_SUCCESS,
        payload: data,
    }
}

export const fetchContractsLoading = (data) => {
    return {
        type: FETCH_CONTRACT_LOADING,
        payload: data,
    }
}

export const fetchContractsError = (data) => {
    return {
        type: FETCH_CONTRACT_ERROR,
        payload: data,
    }
}

export const fetchContracts = () => {
    let isLoading = true
    return (dispatch) => {
        dispatch(fetchContractsLoading(isLoading))
        return axios.get(CONTRACT_REST_API_URL)
            .then(response => {
                const data = response.data;
                console.log("data")
                dispatch(fetchContractsSuccess(data))
                isLoading = false;
                dispatch(fetchContractsLoading(isLoading))
            }).catch(error => {
                debugger
                const errorPayload = {};
                errorPayload['message'] = error.response?.data?.error;
                errorPayload['message'] = errorPayload['message'] + error.response?.data?.message;
                errorPayload['status'] = error.response?.status;
                dispatch(fetchContractsError(errorPayload))

                isLoading = false
                dispatch(fetchContractsLoading(isLoading))
            })
    }
}