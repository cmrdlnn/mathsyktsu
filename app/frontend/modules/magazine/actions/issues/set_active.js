import { SET_ACTIVE_ISSUE, SET_ACTIVE_RUBRIC } from '../../constants';

export default function ({ id, rubric_id: rubricId }) {
  return (dispatch) => {
    dispatch({
      type: SET_ACTIVE_RUBRIC,
      payload: rubricId,
    });

    dispatch({
      type: SET_ACTIVE_ISSUE,
      payload: id,
    });
  };
}
