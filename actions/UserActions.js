export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const saveUser = user => {
    return {
        type : LOGIN,
        payload : user
    }
}

export const removeUser = () => {
    return {
        type : LOGOUT
    }
}