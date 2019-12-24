import { SAVE, REMOVE } from '../actions';
 
const apolloClient = (state={},action) => {
    switch(action.type){
        case SAVE :
            return action.payload
        case REMOVE :
            return {}
        default :
            return state
    }
}

export default apolloClient;