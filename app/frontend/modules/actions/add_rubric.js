export default function (newRubric) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_RUBRIC',
      payload: newRubric
    })
  }
}
