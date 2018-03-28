import jwtDecode from 'jwt-decode';

import { JSONRequest } from 'api';

import { LOGIN } from '../constants';

export default function (data) {
  return dispatch => (
    JSONRequest('/users/login', { user: data })
      .then(response => response.json(), response => response.json())
      .then((json) => {
        const { error, token } = json;

        let payload;

        if (error) {
          payload = json;
        } else {
          localStorage.setItem('JWT', token);
          payload = { role: jwtDecode(token).role };
        }

        dispatch({
          type: LOGIN,
          payload,
        });
      })
  );
}
