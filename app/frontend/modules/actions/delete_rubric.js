export default function (id) {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_RUBRIC',
      payload: id
    })
  }
}
