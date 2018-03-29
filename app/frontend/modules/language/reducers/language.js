import { CHANGE } from '../constants';

export default function (state = 'russian', { type }) {
  switch (type) {
    case CHANGE: {
      return state === 'russian' ? 'english' : 'russian';
    }

    default:
      return state;
  }
}
