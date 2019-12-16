import { combineReducers } from 'redux';
import user from './userReducer';
import apollo from './ApolloReducer';
const rootReducer = combineReducers({
    user,
    apollo
})

export default rootReducer
