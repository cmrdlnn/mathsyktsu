import { combineReducers } from 'redux'

import session from './reducers/session'
import magazine from './reducers/magazine'

export default combineReducers({
  session,
  magazine
})

export sessionStart from './actions/session_start'
export logOut from './actions/log_out'
export checkToken from './actions/check_token'

export closeLoginModal from './actions/close_login_modal'

export fetchRubrics from './actions/fetch_rubrics'
export addRubric from './actions/add_rubric'
export changeRubric from './actions/change_rubric'
export deleteRubric from './actions/delete_rubric'
export setActiveRubric from './actions/set_active_rubric'

export addIssue from './actions/add_issue'
export changeIssue from './actions/change_issue'
export deleteIssue from './actions/delete_issue'
export setActiveIssue from './actions/set_active_issue'