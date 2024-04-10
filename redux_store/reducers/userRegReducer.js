import { REGISTER_USER, LOGIN, AVATAR } from "../actions/userRegAction"


const initialState = {
    user: [],
    isLoggedIn: "false",
    avatar: "user",
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
        case AVATAR:
            return{                    
                ...state,                
                isLoggedIn: "true",
                avatar: action.payload,                                
            }
        default:
            return state;
    }
};


export default userRegReducer;