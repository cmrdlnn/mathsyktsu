export default function (issue) {
  return (dispatch) => {
    dispatch({
      type: 'SET_ACTIVE_ISSUE',
      payload: issue
    })
  }
}
