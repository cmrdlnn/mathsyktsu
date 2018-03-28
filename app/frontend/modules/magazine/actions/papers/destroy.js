import request from 'api';

import { DESTROY_PAPER } from '../../constants';

export default function (id) {
  return dispatch => (
    request(`/papers/${id}`, null, 'DELETE')
      .then(() => {
        dispatch({
          type: DESTROY_PAPER,
          payload: id,
        });
      })
  );
}
