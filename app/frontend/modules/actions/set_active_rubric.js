export default function (rubric) {
  return (dispatch) => {
    dispatch({
      type: 'SET_ACTIVE_RUBRIC',
      payload: rubric
    })
  }
}
