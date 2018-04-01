import request from 'api';

import { UPDATE_ISSUE } from '../../constants';

export default function (id, issue) {
  return dispatch => (
    request(`/issues/${id}`, issue, 'PUT')
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: UPDATE_ISSUE,
          payload,
        });
      })
  );
}
