export const FETCH_GAMES_REQUEST = 'FETCH_GAMES_REQUEST';
export const FETCH_GAMES_SUCCESS = 'FETCH_GAMES_SUCCESS';
export const FETCH_GAMES_FAILURE = 'FETCH_GAMES_FAILURE';

export const fetchGamesRequest = () => ({
  type: FETCH_GAMES_REQUEST
});

export const fetchGamesSuccess = (games) => ({
  type: FETCH_GAMES_SUCCESS,
  payload: games
});

export const fetchGamesFailure = (error) => ({
  type: FETCH_GAMES_FAILURE,
  payload: error
});