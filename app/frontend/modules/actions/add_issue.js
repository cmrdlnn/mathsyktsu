export default function (newIssue) {
  return (dispatch) => {
    dispatch({
      type: 'ADD_ISSUE',
      payload: newIssue
    })
  }
}
