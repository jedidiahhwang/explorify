import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from "./userReducer.js";
import tokenReducer from "./tokenReducer.js";
import genreReducer from "./genreReducer.js";
import userListReducer from "./userListReducer.js";


const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
  genre: genreReducer,
  userList: userListReducer
})

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(promiseMiddleware))
  )
