import {
  CLEAR_ISSUES,
  CREATE_ISSUE,
  DESTROY_ISSUE,
  INDEX_ISSUES,
  SET_ACTIVE_ISSUE,
  UPDATE_ISSUE,
} from '../constants';

import findIndexById, { sliceByIndex } from '../utils';

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
      return { ...state, all: [...state.all, payload] };
    }

    case DESTROY_ISSUE: {
      const index = findIndexById(payload, state.all);
      return { ...state, all: sliceByIndex(index, state.all) };
    }

    case INDEX_ISSUES: {
      return { ...state, all: payload, fetching: false };
    }

    case SET_ACTIVE_ISSUE: {
      return { ...state, active: payload };
    }

    case UPDATE_ISSUE: {
      const index = findIndexById(payload.id, state.all);
      return { ...state, all: sliceByIndex(index, state.all, payload.issue) };
    }

    default:
      return state;
  }
}
