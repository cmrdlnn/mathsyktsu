export default function (state={}, { type, payload }) {
  switch (type) {
  case 'FETCH_RUBRICS': {
    return  {
      ...state,
      rubrics: {
        ...state.rubrics,
        all: payload
      }
    }
  }

  case 'SET_ACTIVE_RUBRIC': {
    return {
      ...state,
      rubrics: {
        ...state.rubrics,
        active_rubric: payload
      }
    }
  }

  case 'ADD_RUBRIC': {
    return  {
      rubrics: {
        all: [...state.rubrics.all, payload],
        active_rubric: payload
      },
      issues: {
        ...state.issues,
        active_issue: null
      }
    }
  }

  case 'CHANGE_RUBRIC': {
    const allRubrics = state.rubrics.all,
      changedRubric = allRubrics.findIndex(
        rubric => rubric.id == payload.id
      )
    allRubrics[changedRubric].title = payload.newTitle
    return  {
      ...state,
      rubrics: {
        all: allRubrics,
        active_rubric: payload
      }
    }
  }

  case 'DELETE_RUBRIC': {
    const rubrics = deleteById(state.rubrics.all, payload)
    return  {
      ...state,
      rubrics: {
        all: rubrics,
        active_rubric: rubrics[0]
      }
    }
  }

  case 'FETCH_ISSUES': {
    return  {
      ...state,
      issues: {
        ...state.issues,
        all: payload
      }
    }
  }

  case 'SET_ACTIVE_ISSUE': {
    return  {
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
    return {
      ...state,
      issues: {
        all: [...state.issues.all, payload],
        active_issue: payload
      }
    }
  }

  case 'DELETE_ISSUE': {
    const issues = deleteById(state.issues.all, payload)
    return {
      ...state,
      issues: {
        all: issues,
        active_issue: issues.length ? issues[0] : null
      }
    }
  }

  default:
    return state
  }
}

function deleteById(items, id) {
  const index = items.findIndex(item => item.id == id)
  return [
    ...items.slice(0, index),
    ...items.slice(index + 1)
  ]
}