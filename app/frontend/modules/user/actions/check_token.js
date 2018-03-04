import jwtDecode from 'jwt-decode';
import { request } from 'api';

export default function () {
  return (dispatch) => {
    request('/check').then((response) => {
      if (response.status !== 200) {
        dispatch({
          type: 'CHECK_TOKEN',
          payload: { token: null, status: null, role: null }
        })
        localStorage.removeItem('auth_token')
      } else {
        dispatch({
          type: 'CHECK_TOKEN',
          payload: { token: token, role: jwtDecode(token).role }
        })
      }
    })
  }
}
