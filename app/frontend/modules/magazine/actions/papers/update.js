import request from 'api';

import { UPDATE_PAPER } from '../../constants';

export default function (id, paper) {
  return dispatch => (
    request(`/papers/${id}`, paper, 'PUT')
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: UPDATE_PAPER,
          payload,
        });
      })
  );
}
