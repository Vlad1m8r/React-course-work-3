
export const ADD_CLIENT_ERROR = "ADD_CLIENT_ERROR"
export const ADD_CLIENT_LOADING = "ADD_CLIENT_LOADING"
export const ADD_CLIENT_SUCCESS = "ADD_CLIENT_SUCCESS"

export const DELETE_CLIENT_LOADING = "DELETE_CLIENT_LOADING"
export const DELETE_CLIENT_ERROR = "DELETE_CLIENT_ERROR"
export const DELETE_CLIENT_SUCCESS = "DELETE_CLIENT_SUCCESS"

export const EDIT_CLIENT_LOADING = "EDIT_CLIENT_LOADING"
export const EDIT_CLIENT_ERROR = "EDIT_CLIENT_ERROR"
export const EDIT_CLIENT_SUCCESS = "EDIT_CLIENT_SUCCESS"

export const FETCH_CLIENT_ERROR = "FETCH_CLIENT_ERROR"
export const FETCH_CLIENT_SUCCESS = "FETCH_CLIENT_SUCCESS"
export const FETCH_CLIENT_LOADING = "FETCH_CLIENT_LOADING"



const defaultState = {
    clients: [],
    error: null,
    isLoading: false,
    sortByIdBool: true,
}


export const clientReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_CLIENT_SUCCESS:
            return {...state, clients: action.payload}
        case FETCH_CLIENT_LOADING:
            return {...state, isLoading: action.payload}
        case FETCH_CLIENT_ERROR:
            return {...state, error: action.payload}
        case ADD_CLIENT_SUCCESS:
            return {...state, clients: [...state.clients, action.payload]}
        case ADD_CLIENT_ERROR:
            return  {...state, error: action.payload}
        case EDIT_CLIENT_SUCCESS:
            const updateCars = state.clients.filter(clients => clients.id !== action.payload.id)
            return {...state, clients: [...updateCars, action.payload]}
        case DELETE_CLIENT_SUCCESS:
            const filterCars = state.clients.filter(clients => clients.id !== action.payload)
            return {...state, clients: [...filterCars] }
        case DELETE_CLIENT_ERROR:
            return {...state, error: action.payload}
        case "СОРТИРОВКА_ПО_ID_CLIENT":
            if (action.payload) {
                console.log("sorted")
                const sortedClients = state.clients.sort((a, b) => a.id > b.id ? 1 : -1)
                return {...state, clients: [...sortedClients], sortByIdBool: !action.payload}
            } else {
                const unSortedClients = state.clients.sort((a, b) => a.id < b.id ? 1 : -1)
                return {...state, clients: [...unSortedClients], sortByIdBool: !action.payload}
            }
        default:
            return state
    }
}