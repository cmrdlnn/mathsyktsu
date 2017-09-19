import { ajaxRequestToServer } from '../../api'

export default function (rubric = null, issue = null) {
  return (dispatch) => {
    ajaxRequestToServer('/issues/index').then(response => {
      if (response.status == 200) {
        response.json().then(data => {
          dispatch({
            type: 'FETCH_ISSUES',
            payload: data
          })
          let active_issue
          if (issue) {
            active_issue = issue
          } else {
            active_issue = null
          }
          dispatch({
            type: 'SET_ACTIVE_ISSUE',
            payload: active_issue
          })
          ajaxRequestToServer('/rubrics/index').then(response => {
            if (response.status == 200) {
              response.json().then(data => {
                dispatch({
                  type: 'FETCH_RUBRICS',
                  payload: data
                })
                let active_rubric
                if (rubric) {
                  active_rubric = rubric
                } else if (data.length > 0) {
                  active_rubric = data[0]
                } else {
                  active_rubric = null
                }
                dispatch({
                  type: 'SET_ACTIVE_RUBRIC',
                  payload: active_rubric
                })
              })
            }
          })
        })
      }
    })
  }
}
