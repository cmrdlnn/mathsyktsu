import { JSONRequest } from 'api';

import { CREATE_ISSUE } from '../../constants';

export default function (issue) {
  return dispatch => (
    JSONRequest('/issues', { issue })
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: CREATE_ISSUE,
          payload,
        });
      })
  );
}
