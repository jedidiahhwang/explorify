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

// Set initial state
const initialState = {
    accessToken: "",
    verifiedToken: false
}

// Set action constants
const ACCESS_TOKEN = "ACCESS_TOKEN";

// Set the necessary action creators
export function setAccessToken(accessToken) {
    console.log(accessToken);
    return {
        type: ACCESS_TOKEN,
        payload: accessToken
    }
}

// Finally, export the functions in one reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case ACCESS_TOKEN:
            // const {accessToken} = action.payload
            return {accessToken: action.payload, verifiedToken: true}
        default:
            return state
    }
}