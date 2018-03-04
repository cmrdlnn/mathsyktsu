import { combineReducers } from 'redux';

import user from './user';
import magazine from './magazine';

export default combineReducers({
  magazine,
  user,
});
