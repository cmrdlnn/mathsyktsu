import { JSONRequest } from 'api';

import { UPDATE_RUBRIC } from '../../constants';

export default function (id, rubric) {
  return dispatch => (
    JSONRequest(`/rubrics/${id}`, { rubric }, 'PUT')
      .then(response => response.json())
      .then(() => {
        dispatch({
          type: UPDATE_RUBRIC,
          payload: { id, rubric },
        });
      })
  );
}
