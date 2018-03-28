import request from 'api';

import { INDEX_ISSUES } from '../../constants';

export default function () {
  return dispatch => (
    request('/issues')
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: INDEX_ISSUES,
          payload,
        });
      })
  );
}
