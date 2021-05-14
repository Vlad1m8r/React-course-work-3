import {
    ADD_CAR_ERROR,
    ADD_CAR_LOADING,
    ADD_CAR_SUCCESS,
    DELETE_CAR_LOADING,
    DELETE_CAR_ERROR,
    DELETE_CAR_SUCCESS,
    EDIT_CAR_LOADING,
    EDIT_CAR_ERROR,
    EDIT_CAR_SUCCESS,
    FETCH_CAR_ERROR,
    FETCH_CAR_SUCCESS,
    FETCH_CAR_LOADING,
} from "../reducers/carReducer"

import axios from "axios";

import {history} from "../index";

const CAR_REST_API_URL = 'http://localhost:8080/api/car';

//CREAT------------------------------------------------------------------
export const createCarSuccess = (data) => {
    return {
        type: ADD_CAR_SUCCESS,
        payload: data,
    }
}

export const createCarError = (data) => {
    // debugger
    return {
        type: ADD_CAR_ERROR,
        payload: data,
    }
}

export const createCar = (car) => {

    debugger
    if (car.id) {
        const data = {
            id: car.id,
            carVIN: car.carVIN,
            carNumber: car.carNumber,
            carModel: car.carModel,
            carMake: car.carMake,
            cost: car.cost,
            type: car.type,
            carColor: car.carColor,
            carModelYear: car.carModelYear
        }
        return (dispatch => {
            dispatch(editCar(data))
        })
    } else {
        const data = {
            carVIN: car.carVIN,
            carNumber: car.carNumber,
            carModel: car.carModel,
            carMake: car.carMake,
            cost: car.cost,
            type: car.type,
            carColor: car.carColor,
            carModelYear: car.carModelYear
        }

        return (dispatch) => {
            return axios.post(CAR_REST_API_URL, data)
                .then(response => {

                    dispatch(createCarSuccess(response.data))
                    history.push('/')

                }).catch(error => {
                    console.log(error)
                    const errorPayload = {}
                    errorPayload['message'] = error.response?.data
                    errorPayload['status'] = error.response?.status
                    dispatch(createCarError(errorPayload))
                })
        }
    }

}

//EDIT-------------------------------------------------------------------
export const editCarError = (data) => {
    return {
        type: EDIT_CAR_ERROR,
        payload: data,
    }
}

export const editCarSuccess = (data) => {
    return {
        type: EDIT_CAR_SUCCESS,
        payload: data,
    }

}

export const editCar = (data) => {
    const id = data.id
    return (dispatch) => {
        return axios.put(`${CAR_REST_API_URL}`, data)
            .then(() => {
                history.push('/')
                return axios.get(`${CAR_REST_API_URL}/${id}`)
                    .then(response => {
                        dispatch(editCarSuccess(response.data))
                        // history.push('/')
                    }).catch(error => {
                        // debugger
                        dispatch(editCarError(error))
                    })
            }).catch(error => {
                // debugger
                dispatch(editCarError(error))
            })
    }
}


//DELETE-----------------------------------------------------------------
export const deleteCarsSuccess = (data) => {
    return {
        type: DELETE_CAR_SUCCESS,
        payload: data,
    }
}
export const deleteCarsError = (data) => {
    debugger
    return {
        type: DELETE_CAR_ERROR,
        payload: data,
    }
}

export const deleteCars = (id) => {
    return (dispatch) => {
        return axios.delete(`${CAR_REST_API_URL}/${id}`)
            .then(() => {
                dispatch(deleteCarsSuccess(id))
            })
            .catch(error => {
                dispatch(deleteCarsError(error))

            })
    }
}



//FETCH------------------------------------------------------------------
export const fetchCarsSuccess = (data) => {
    return {
        type: FETCH_CAR_SUCCESS,
        payload: data,
    }
}

export const fetchCarsLoading = (data) => {
    return {
        type: FETCH_CAR_LOADING,
        payload: data,
    }
}

export const fetchCarsError = (data) => {
    return {
        type: FETCH_CAR_ERROR,
        payload: data,
    }
}

export const fetchCars = () => {
    return (dispatch) => {
        dispatch(fetchCarsLoading(true))
        return axios.get(CAR_REST_API_URL)
            .then(response => {
                const data = response.data;
                dispatch(fetchCarsSuccess(data))
                dispatch(fetchCarsLoading(false))
            }).catch(error => {
                dispatch(fetchCarsError(error))
                dispatch(fetchCarsLoading(false))
            })
    }
}


//FETCH--STATISTIC----------------------------------------------------------------
export const fetchCarsStaticSuccess = (data) => {
    return {
        type: "CAR_STATISTIC",
        payload: data,
    }
}

export const fetchCarsStatistic = () => {
    return (dispatch) => {
        return axios.get(`${CAR_REST_API_URL}/static`)
            .then(response => {
                const data = response.data;
                dispatch(fetchCarsStaticSuccess(data))
            }).catch(error => {
                debugger
                dispatch(fetchCarsError(error))
            })
    }
}