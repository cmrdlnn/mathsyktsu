import jwtDecode from 'jwt-decode'
import { JSONRequest } from 'api'

export default function (data, remember) {
  return (dispatch) => {
    JSONRequest('/signin', data, 'post')
      .then(response =>  {
        if (response.status == 404) {
          dispatch({
            type: 'USER_NOT_FOUND',
            payload: response.status
          })
        } else if (response.status == 403) {
          dispatch({
            type: 'USER_FORBIDDEN',
            payload: response.status
          })
        } else if (response.status == 401) {
          dispatch({
            type: 'USER_UNAUTHORIZED',
            payload: response.status
          })
        } else if (response.status == 202) {
          response.json().then(json => {
            dispatch({
              type: 'USER_AUTHORIZED',
              payload: { token: json.auth_token, status: 202, role: jwtDecode(json.auth_token).role }
            })
            if (remember) {
              localStorage.setItem('auth_token', json.auth_token)
            }
          })
        }
      })
  }
}
