import { SET_ACTIVE_ISSUE, SET_ACTIVE_RUBRIC } from '../../constants';

export default function ({ id }) {
  return (dispatch) => {
    dispatch({
      type: SET_ACTIVE_RUBRIC,
      payload: id,
    });

    dispatch({
      type: SET_ACTIVE_ISSUE,
      payload: null,
    });
  };
}
