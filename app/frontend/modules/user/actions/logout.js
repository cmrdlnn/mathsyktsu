import { LOGOUT } from '../constants';

export default function () {
  localStorage.removeItem('JWT');
  return { type: LOGOUT };
}
