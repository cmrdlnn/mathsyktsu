import request from 'api';

import { CREATE_ISSUE } from '../../constants';

export default function (issue) {
  return (dispatch, getState) => (
    request('/issues', issue, 'POST')
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: CREATE_ISSUE,
          payload,
        });
      })
  );
}
