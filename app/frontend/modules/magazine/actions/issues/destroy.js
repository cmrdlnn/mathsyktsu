import { request } from 'api';

import { DESTROY_ISSUE } from '../../constants';

export default function (id) {
  return dispatch => (
    request(`/issues/${id}`, null, 'DELETE')
      .then(() => {
        dispatch({
          type: DESTROY_ISSUE,
          payload: id,
        });
      })
  );
}
