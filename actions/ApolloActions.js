export const SAVE = 'SAVE';
export const REMOVE = 'REMOVE';

export const saveApolloClient = client => {
    return {
        type : SAVE,
        payload : client
    }
}

export const removeApolloClient = () => {
    return {
        type : REMOVE
    }
}