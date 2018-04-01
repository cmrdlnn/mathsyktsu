import request from 'api';

import { CREATE_RUBRIC } from '../../constants';

export default function (rubric) {
  return dispatch => (
    request('/rubrics', rubric, 'POST')
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: CREATE_RUBRIC,
          payload,
        });
      })
  );
}
