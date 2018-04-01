import { AUTHENTICATE, CLEAR, LOGIN, LOGOUT } from '../constants';

export default function (state = {}, { type, payload }) {
  switch (type) {
    case AUTHENTICATE: {
      return payload;
    }

    case CLEAR: {
      return {};
    }

    case LOGIN: {
      return payload;
    }

    case LOGOUT: {
      return {};
    }

    default:
      return state;
  }
}
