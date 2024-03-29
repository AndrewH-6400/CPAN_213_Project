import { REGISTER_USER } from "../actions/userRegAction"

const initialState = {
    user: [],
    loading: false,
    error: null
};

const userRegReducer = (state = initialState, action) => {
    switch (action.type){
        case REGISTER_USER:
            return{
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default userRegReducer;