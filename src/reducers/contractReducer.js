
export const ADD_CONTRACT_ERROR = "ADD_CONTRACT_ERROR"
export const ADD_CONTRACT_LOADING = "ADD_CONTRACT_LOADING"
export const ADD_CONTRACT_SUCCESS = "ADD_CONTRACT_SUCCESS"

export const DELETE_CONTRACT_LOADING = "DELETE_CONTRACT_LOADING"
export const DELETE_CONTRACT_ERROR = "DELETE_CONTRACT_ERROR"
export const DELETE_CONTRACT_SUCCESS = "DELETE_CONTRACT_SUCCESS"

export const EDIT_CONTRACT_LOADING = "EDIT_CONTRACT_LOADING"
export const EDIT_CONTRACT_ERROR = "EDIT_CONTRACT_ERROR"
export const EDIT_CONTRACT_SUCCESS = "EDIT_CONTRACT_SUCCESS"

export const FETCH_CONTRACT_ERROR = "FETCH_CONTRACT_ERROR"
export const FETCH_CONTRACT_SUCCESS = "FETCH_CONTRACT_SUCCESS"
export const FETCH_CONTRACT_LOADING = "FETCH_CONTRACT_LOADING"



const defaultState = {
    allContracts: [],
    contracts: [],
    error: null,
    isLoading: false,
    sortByIdBool: true,
    searchContractName: []
}


export const contractReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_CONTRACT_SUCCESS:
            return {...state, contracts: action.payload, allContracts: action.payload}
        case FETCH_CONTRACT_LOADING:
            return {...state, isLoading: action.payload}
        case FETCH_CONTRACT_ERROR:
            return {...state, error: action.payload}
        case ADD_CONTRACT_SUCCESS:
            return {...state, contracts: [...state.contracts, action.payload]}
        case ADD_CONTRACT_ERROR:
            return  {...state, error: action.payload}
        case EDIT_CONTRACT_SUCCESS:
            const updateCars = state.contracts.filter(contracts => contracts.id !== action.payload.id)
            return {...state, contracts: [...updateCars, action.payload]}
        case DELETE_CONTRACT_SUCCESS:
            const filterContract = state.contracts.filter(contracts => contracts.id !== action.payload)
            return {...state, contracts: [...filterContract] }
        case DELETE_CONTRACT_ERROR:
            return {...state, error: action.payload}
        case "СОРТИРОВКА_ПО_ID_CONTRACT":
            if (action.payload) {
                console.log("sorted")
                const sortedContract = state.contracts.sort((a, b) => a.id > b.id ? 1 : -1)
                return {...state, contracts: [...sortedContract], sortByIdBool: !action.payload}
            } else {
                const unSortedContract = state.contracts.sort((a, b) => a.id < b.id ? 1 : -1)
                return {...state, contracts: [...unSortedContract], sortByIdBool: !action.payload}
            }
        case "ПОИСК_ПО_ИМЕНИ":
            state.contracts = state.allContracts
            const searchContractName = []
            state.contracts.forEach(contract => {
                if (contract.client.firstName.indexOf(action.payload) >= 0) {
                    searchContractName.push(contract)
                } else
                if (contract.client.lastName.indexOf(action.payload) >= 0) {
                    searchContractName.push(contract)
                }
            })
            // debugger
            return {...state, contracts: [...searchContractName]}
        default:
            return state
    }
}