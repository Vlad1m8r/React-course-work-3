
export const ADD_CAR_ERROR = "ADD_CAR_ERROR"
export const ADD_CAR_LOADING = "ADD_CAR_LOADING"
export const ADD_CAR_SUCCESS = "ADD_CAR_SUCCESS"

export const DELETE_CAR_LOADING = "DELETE_CAR_LOADING"
export const DELETE_CAR_ERROR = "DELETE_CAR_ERROR"
export const DELETE_CAR_SUCCESS = "DELETE_CAR_SUCCESS"

export const EDIT_CAR_LOADING = "EDIT_CAR_LOADING"
export const EDIT_CAR_ERROR = "EDIT_CAR_ERROR"
export const EDIT_CAR_SUCCESS = "EDIT_CAR_SUCCESS"

export const FETCH_CAR_ERROR = "FETCH_CAR_ERROR"
export const FETCH_CAR_SUCCESS = "FETCH_CAR_SUCCESS"
export const FETCH_CAR_LOADING = "FETCH_CAR_LOADING"



const defaultState = {
    cars: [],
    error: null,
    isLoading: false,
    sortByIdBool: true,
    carsStatic:[]
}


export const carReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_CAR_SUCCESS:
            return {...state, cars: action.payload}
        case FETCH_CAR_LOADING:
            return {...state, isLoading: action.payload}
        case FETCH_CAR_ERROR:
            return {...state, error: action.payload}
        case ADD_CAR_SUCCESS:
            return {...state, cars: [...state.cars, action.payload]}
        case ADD_CAR_ERROR:
            return  {...state, error: action.payload}
        case EDIT_CAR_SUCCESS:
            const updateCars = state.cars.filter(cars => cars.id !== action.payload.id)
            return {...state, cars: [...updateCars, action.payload]}
        case DELETE_CAR_SUCCESS:
            const filterCars = state.cars.filter(cars => cars.id !== action.payload)
            return {...state, cars: [...filterCars] }
        case DELETE_CAR_ERROR:
            return {...state, error: action.payload}
        case "СОРТИРОВКА_ПО_ID_CAR":
            if (action.payload) {
                console.log("sorted")
                const sortedCar = state.cars.sort((a, b) => a.id > b.id ? 1 : -1)
                return {...state, cars: [...sortedCar], sortByIdBool: !action.payload}
            } else {
                const unSortedCar = state.cars.sort((a, b) => a.id < b.id ? 1 : -1)
                return {...state, cars: [...unSortedCar], sortByIdBool: !action.payload}
            }
        case "CAR_STATISTIC":
            return {...state, carsStatic: action.payload}
        default:
            return state
    }
}