import { combineReducers } from 'redux';

import issues from './reducers/issues';
import papers from './reducers/papers';
import rubrics from './reducers/rubrics';

export default combineReducers({
  issues,
  papers,
  rubrics,
});

export createRubric from './actions/rubrics/create';
export destroyRubric from './actions/rubrics/destroy';
export indexRubrics from './actions/rubrics/index';
export setActiveRubric from './actions/rubrics/set_active';
export updateRubric from './actions/rubrics/update';

export createIssue from './actions/issues/create';
export destroyIssue from './actions/issues/destroy';
export setActiveIssue from './actions/issues/set_active';
export updateIssue from './actions/issues/update';
