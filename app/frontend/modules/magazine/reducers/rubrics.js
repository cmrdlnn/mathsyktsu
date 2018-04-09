import {
  CLEAR_RUBRICS,
  CREATE_RUBRIC,
  DESTROY_RUBRIC,
  INDEX_RUBRICS,
  SET_ACTIVE_RUBRIC,
  UPDATE_RUBRIC,
} from '../constants';

import findIndexesByProp, { sliceByIndexes } from '../utils';

const initialState = {
  all: [],
  fetching: true,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CLEAR_RUBRICS: {
      return initialState;
    }

    case CREATE_RUBRIC: {
      return { ...state, active: payload.id, all: [...state.all, payload] };
    }

    case DESTROY_RUBRIC: {
      const index = findIndexesByProp('id', payload, state.all);
      return { ...state, all: sliceByIndexes(index, state.all) };
    }

    case INDEX_RUBRICS: {
      return { ...state, all: payload, fetching: false };
    }

    case SET_ACTIVE_RUBRIC: {
      return { ...state, active: payload };
    }

    case UPDATE_RUBRIC: {
      const index = findIndexesByProp('id', payload.id, state.all);
      return { ...state, all: sliceByIndexes(index, state.all, payload) };
    }

    default:
      return state;
  }
}
