import { connect } from 'react-redux';
import RequestsTab from './RequestsTab';

import { actions } from 'tingme/store/ting';

export default connect(
  ({ ting }) => ({
    requests: ting.requests
  }),
  dispatch => ({
    onGetRequests() {
      dispatch(actions.getRequests());
    }
  })
)(RequestsTab);
