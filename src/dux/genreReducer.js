/* 
    Remember the 4 parts to a reducer:
        1) Initial State
            - Set the initial state
        2) Action Constants
            - Constants to manipulate
        3) action creators
            - Sets the object with type and payload
        4) reducer
            - Executes the desired functions
*/
import axios from "axios";

// Set initial state
const initialState = {
    genre: "",
}

// Set action constants
const ADD_GENRE = "ADD_GENRE";

// Set the necessary action creators
export function addGenre(genre) {
    return {
        type: ADD_GENRE,
        payload: genre
    }
}

// Finally, export the functions in one reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ADD_GENRE:
            return {genre: action.payload}
        default:
            return state
    }
}