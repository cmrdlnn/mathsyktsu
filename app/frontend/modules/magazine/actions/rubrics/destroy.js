import request from 'api';

import { DESTROY_RUBRIC } from '../../constants';

export default function (id) {
  return dispatch => (
    request(`/rubrics/${id}`, null, 'DELETE')
      .then(() => {
        dispatch({
          type: DESTROY_RUBRIC,
          payload: id,
        });
      })
  );
}
