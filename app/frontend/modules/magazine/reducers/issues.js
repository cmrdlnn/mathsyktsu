import {
  CLEAR_ISSUES,
  CREATE_ISSUE,
  DESTROY_ISSUE,
  DESTROY_RUBRIC,
  INDEX_ISSUES,
  SET_ACTIVE_ISSUE,
  UPDATE_ISSUE,
} from '../constants';

import findIndexesByProp, { sliceByIndexes } from '../utils';

const initialState = {
  all: [],
  fetching: true,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CLEAR_ISSUES: {
      return initialState;
    }

    case CREATE_ISSUE: {
      return { ...state, active: payload.id, all: [...state.all, payload] };
    }

    case DESTROY_ISSUE: {
      const index = findIndexesByProp('id', payload, state.all);
      return { ...state, all: sliceByIndexes(index, state.all) };
    }

    case DESTROY_RUBRIC: {
      const indexes = findIndexesByProp('rubric_id', payload, state.all);
      return { ...state, all: sliceByIndexes(indexes, state.all) };
    }

    case INDEX_ISSUES: {
      return { ...state, all: payload, fetching: false };
    }

    case SET_ACTIVE_ISSUE: {
      return { ...state, active: payload };
    }

    case UPDATE_ISSUE: {
      const index = findIndexesByProp('id', payload.id, state.all);
      return { ...state, all: sliceByIndexes(index, state.all, payload) };
    }

    default:
      return state;
  }
}
