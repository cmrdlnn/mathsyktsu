import { JSONRequest } from 'api';

import { CREATE_PAPER } from '../../constants';

export default function (paper) {
  return dispatch => (
    JSONRequest('/papers', { paper })
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: CREATE_PAPER,
          payload,
        });
      })
  );
}
