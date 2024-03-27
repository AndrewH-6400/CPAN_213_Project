export const FETCH_TEAMS_REQUEST = 'FETCH_TEAMS_REQUEST';
export const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';
export const FETCH_TEAMS_FAILURE = 'FETCH_TEAMS_SUCCESS';


export const fetchTeamsRequest = () => ({
    type: FETCH_TEAMS_REQUEST
});

export const fetchTeamsSuccess = () => ({
    type: FETCH_TEAMS_SUCCESS,
    payload: teams
});

export const fetchTeamsFailure = () => ({
    type: FETCH_TEAMS_FAILURE,
    payload: error
});


