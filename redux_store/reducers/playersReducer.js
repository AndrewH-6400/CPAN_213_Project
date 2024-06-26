import {
    FETCH_PLAYERS_REQUEST,
    FETCH_PLAYERS_SUCCESS,
    FETCH_PLAYERS_FAILURE
} from '../actions/playersAction'

const initialState = {
    players: [],
    loading: false,
    error: null
  };
  
  const playerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PLAYERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_PLAYERS_SUCCESS:
        return {
          ...state,
          loading: false,
          players: action.payload,
          error: null
        };
      case FETCH_PLAYERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default playerReducer;