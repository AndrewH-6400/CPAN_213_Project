import { REGISTER_USER, LOGIN } from "../actions/userRegAction"

const initialState = {
    user: [],
    isLoggedIn: "false",
    loading: false,
    error: null,
};

const userRegReducer = (state = initialState, action) => {
    switch (action.type){
        case REGISTER_USER:
            return{
                ...state,
                user: action.payload,
                isLoggedIn: "true",
            };
        case LOGIN:
            return{
                ...state,
                user: action.payload,
                isLoggedIn: "true",
            }
        default:
            return state;
    }
};


export default userRegReducer;