export default function () {
  return (dispatch) => {
    localStorage.removeItem('auth_token')
    dispatch({
      type: 'LOG_OUT'
    })
  }
}
