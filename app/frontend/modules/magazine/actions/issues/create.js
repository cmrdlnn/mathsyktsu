import request from 'api';

import { CREATE_ISSUE } from '../../constants';

export default function (issue, rubricId) {
  return (dispatch) => {
    issue.append('rubric_id', rubricId);

    return request('/issues', issue, 'POST')
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: CREATE_ISSUE,
          payload,
        });
      });
  };
}
