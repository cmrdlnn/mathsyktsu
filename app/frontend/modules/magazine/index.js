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
export indexIssues from './actions/issues/index';
export setActiveIssue from './actions/issues/set_active';
export updateIssue from './actions/issues/update';

export createPaper from './actions/papers/create';
export destroyPaper from './actions/papers/destroy';
export indexPapers from './actions/papers/index';
export updatePaper from './actions/papers/update';
