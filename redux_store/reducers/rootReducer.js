
import { combineReducers } from 'redux';
import teamReducer from './teamsReducer'; 
import playerReducer from './playersReducer'; 
import gameReducer from './gamesReducer';
import statsReducer from './statsReducer';
import userRegReducer from './userRegReducer';

const rootReducer = combineReducers({
  teams: teamReducer, 
  players: playerReducer, 
  games: gameReducer,
  stats: statsReducer,
  user: userRegReducer
});

export default rootReducer;
