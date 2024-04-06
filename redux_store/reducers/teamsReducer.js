

import{
    FETCH_TEAMS_REQUEST,
    FETCH_TEAMS_SUCCESS,
    FETCH_TEAMS_FAILURE
} from '../actions/teamsAction'


const initialState = {
    teams: [],
    loading: false,
    error: null
}

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TEAMS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_TEAMS_SUCCESS:
        return {
          ...state,
          loading: false,
          teams: action.payload,
          error: null
        };
      case FETCH_TEAMS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };

  export default teamReducer;