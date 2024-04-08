import {
    FETCH_GAMES_FAILURE,
    FETCH_GAMES_REQUEST,
    FETCH_GAMES_SUCCESS
} from '../actions/gamesAction';


const initialState = {
    games: [],
    loading: false,
    error: null
  };
  
  const gameReducer = (state = initialState, action) => {
    // console.log("Action:", action); // Log the action object
    // console.log("Current State:", state); // Log the current state object

    switch (action.type) {
      case FETCH_GAMES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_GAMES_SUCCESS:
        return {
          ...state,
          loading: false,
          games: action.payload,
          error: null
        };
      case FETCH_GAMES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default gameReducer;