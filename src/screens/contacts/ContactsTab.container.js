import { connect } from 'react-redux';
import ContactsTab from './ContactsTab';

import { actions } from 'tingme/store/ting';

export default connect(
  ({ ting }) => ({ contacts: ting.contacts }),
  dispatch => ({
    onGetContacts() {
      dispatch(actions.getAcceptedRequests());
    }
  })
)(ContactsTab);
