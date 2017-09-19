import jwtDecode from 'jwt-decode'
import { ajaxRequestToServer } from '../../api'

export default function (token) {
  return (dispatch) => {
    ajaxRequestToServer('/check', {}, 'post', {'Authorization': 'Bearer '+token}).then(response => {
      if (response.status != 200) {
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
