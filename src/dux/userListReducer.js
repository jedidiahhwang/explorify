const initialState = {
    userList: [],
}

const ADD_TO_LIST = "ADD_TO_LIST";

export function addToList(genre) {
    return {
        type: ADD_TO_LIST,
        payload: genre
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TO_LIST:
            const newList = [...state.userList, action.payload]
            return {...state, userList: newList}
        default:
            return state
    }
}
