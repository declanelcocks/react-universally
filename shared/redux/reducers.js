import { combineReducers } from 'redux'
import home from './home/reducer'
import authentication from './authentication/reducer'

const rootReducer = combineReducers({
  home,
  authentication,
})

export default rootReducer
