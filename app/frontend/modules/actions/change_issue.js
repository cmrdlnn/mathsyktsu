export default function (data) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_ISSUE',
      payload: data
    })
  }
}
