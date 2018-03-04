export default function (state = {}, { type, payload }) {
  switch (type) {
    case 'FETCH_ISSUES': {
      return {
        ...state,
        issues: {
          ...state.issues,
          all: payload
        }
      }
    }

    case 'SET_ACTIVE_ISSUE': {
      return {
        ...state,
        issues: {
          ...state.issues,
          active_issue: payload
        }
      }
    }

    case 'ADD_ISSUE': {
      return {
        ...state,
        issues: {
          all: [...state.issues.all, payload],
          active_issue: payload
        }
      }
    }

    case 'CHANGE_ISSUE': {
      const issues = changeById(state.issues.all, payload)
      return {
        ...state,
        issues: {
          all: issues,
          active_issue: payload
        }
      }
    }

    case 'DELETE_ISSUE': {
      const issues = deleteById(state.issues.all, payload)
      let active_issue = null
      if (issues.length) {
        active_issue = issues.filter(issue =>
          issue.id == state.rubrics.active_rubric)[0]
      }
      return {
        ...state,
        issues: {
          all: issues,
          active_issue: active_issue
        }
      }
    }

    default:
      return state
    }
}

function changeById(items, changed) {
  const index = items.findIndex(item => item.id == changed.id)
  return [
    ...items.slice(0, index),
    changed,
    ...items.slice(index + 1)
  ]
}

function deleteById(items, id) {
  const index = items.findIndex(item => item.id == id)
  return [
    ...items.slice(0, index),
    ...items.slice(index + 1)
  ]
}