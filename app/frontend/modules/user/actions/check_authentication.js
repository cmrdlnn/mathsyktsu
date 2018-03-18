import jwtDecode from 'jwt-decode';
import { request } from 'api';

export default function () {
  return (dispatch) => {
    request('/users/check').then(() => {
    })
  }
}
