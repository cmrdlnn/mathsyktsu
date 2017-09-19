export default function (id) {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_ISSUE',
      payload: id
    })
  }
}
