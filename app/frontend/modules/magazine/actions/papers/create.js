import request from 'api';

import { CREATE_PAPER } from '../../constants';

export default function (paper, issueId) {
  paper.append('issue_id', issueId);

  return dispatch => (
    request('/papers', paper, 'POST')
      .then(response => response.json())
      .then((payload) => {
        dispatch({
          type: CREATE_PAPER,
          payload,
        });
      })
  );
}
