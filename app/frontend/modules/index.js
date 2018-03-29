import { combineReducers } from 'redux';

import language from './language';
import magazine from './magazine';
import user from './user';

export default combineReducers({
  language,
  magazine,
  user,
});
