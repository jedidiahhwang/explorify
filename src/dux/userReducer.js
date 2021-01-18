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
    username: "",
    accessToken: "",
    isLoggedIn: false
}

// Set action constants
const LOGIN_USER = "LOGIN_USER";
const LOGOUT = "LOGOUT";
const ACCESS_TOKEN = "ACCESS_TOKEN";

// Set the necessary action creators
export function loginUser(username) {
    return {
        type: LOGIN_USER,
        payload: username
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

// export function setAccessToken(accessToken) {
//     return {
//         type: ACCESS_TOKEN,
//         payload: accessToken
//     }
// }

// Finally, export the functions in one reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER:
            const {username} = action.payload
            return {username, isLoggedIn: true}
        case LOGOUT:
            return initialState
        // case ACCESS_TOKEN:
        //     const {accessToken} = action.payload
        //     return {accessToken}
        default:
            return state
    }
}