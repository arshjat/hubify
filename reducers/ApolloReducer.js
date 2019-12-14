import { SAVE, REMOVE } from '../actions';
 
const apollo = (state={},action) => {
    switch(action.type){
        case SAVE :
            return action.payload
        case REMOVE :
            return {}
        default :
            return state
    }
}

export default apollo;