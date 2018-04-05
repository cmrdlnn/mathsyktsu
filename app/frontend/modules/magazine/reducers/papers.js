import {
  CLEAR_PAPERS,
  CREATE_PAPER,
  DESTROY_PAPER,
  INDEX_PAPERS,
  UPDATE_PAPER,
} from '../constants';

import findIndexById, { sliceByIndex } from '../utils';

const initialState = {
  all: [],
  fetching: true,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case CLEAR_PAPERS: {
      return initialState;
    }

    case CREATE_PAPER: {
      return { ...state, all: [...state.all, payload] };
    }

    case DESTROY_PAPER: {
      const index = findIndexById(payload, state.all);
      return { ...state, all: sliceByIndex(index, state.all) };
    }

    case INDEX_PAPERS: {
      return { ...state, all: payload, fetching: false };
    }

    case UPDATE_PAPER: {
      const index = findIndexById(payload.id, state.all);
      return { ...state, all: sliceByIndex(index, state.all, payload) };
    }

    default:
      return state;
  }
}
