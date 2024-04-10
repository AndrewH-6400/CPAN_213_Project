
export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN = 'LOGIN'


export const registerUser = (userData) => {
    return {
        type: 'REGISTER_USER',
        payload: userData,
    };
};

export const logIn = (logInInfo) => {
    return{
        type: 'LOGIN',
        payload: logInInfo        
    }
}

