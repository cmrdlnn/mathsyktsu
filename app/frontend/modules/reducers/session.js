export default function (state={}, { type, payload }) {
  switch (type) {
  case 'USER_NOT_FOUND': {
    return  Object.assign({}, state, {
      status: payload
    })
  }

  case 'USER_FORBIDDEN': {
    return  Object.assign({}, state, {
      status: payload
    })
  }

  case 'USER_UNAUTHORIZED': {
    return  Object.assign({}, state, {
      status: payload
    })
  }

  case 'USER_AUTHORIZED': {
    return  Object.assign({}, state, {
      status: payload.status,
      token: payload.token,
      role: payload.role
    })
  }

  case 'LOG_OUT': {
    return  Object.assign({}, state, {
      status: null,
      token: null,
      role: null
    })
  }

  case 'CLOSE_LOGIN_MODAL': {
    return  Object.assign({}, state, {
      status: null
    })
  }

  case 'CHECK_TOKEN': {
    return  Object.assign({}, state, {
      token: payload.token,
      role: payload.role
    })
  }

  default:
    return state

  }
}
