import request from 'api';

import { INDEX_PAPERS } from '../../constants';

export default function (issueId) {
  return dispatch => (
    request(`/issues/${issueId}/papers`)
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: INDEX_PAPERS,
          payload,
        });
      })
  );
}
