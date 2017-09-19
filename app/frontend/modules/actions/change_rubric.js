export default function (id, newTitle) {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_RUBRIC',
      payload: { id: id, newTitle: newTitle }
    })
  }
}
