import request from 'api';

import { INDEX_RUBRICS } from '../../constants';

export default function () {
  return dispatch => (
    request('/rubrics')
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: INDEX_RUBRICS,
          payload,
        });
      })
  );
}
