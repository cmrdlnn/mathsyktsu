import request from 'api';

import { AUTHENTICATE } from '../constants';

export default function () {
  return (dispatch) => {
    request('/users/authenticate')
      .catch(() => {
        dispatch({
          type: AUTHENTICATE,
          payload: {},
        });
      });
  };
}
