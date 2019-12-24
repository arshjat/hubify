import { combineReducers } from 'redux';
import user from './userReducer';
import apolloClient from './ApolloReducer';
const rootReducer = combineReducers({
    user,
    apolloClient
})

export default rootReducer
