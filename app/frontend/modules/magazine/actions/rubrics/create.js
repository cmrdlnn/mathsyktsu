import { JSONRequest } from 'api';

import { CREATE_RUBRIC } from '../../constants';

export default function (rubric) {
  return dispatch => (
    JSONRequest('/rubrics', { rubric })
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: CREATE_RUBRIC,
          payload,
        });
      })
  );
}
