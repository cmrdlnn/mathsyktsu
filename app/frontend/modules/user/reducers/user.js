export default function (state = {}, { type, payload }) {
  switch (type) {
    case 'USER_NOT_FOUND': {
      return { ...state, status: payload };
    }

    case 'USER_FORBIDDEN': {
      return { ...state, status: payload };
    }

    case 'USER_UNAUTHORIZED': {
      return { ...state, status: payload };
    }

    case 'USER_AUTHORIZED': {
      return { ...state, status: payload.status, token: payload.token, role: payload.role };
    }

    case 'LOG_OUT': {
      return { ...state, status: null, token: null, role: null };
    }

    case 'CLOSE_LOGIN_MODAL': {
      return { ...state, status: null };
    }

    case 'CHECK_TOKEN': {
      return { ...state, token: payload.token, role: payload.role };
    }

    default:
      return state;
  }
}
