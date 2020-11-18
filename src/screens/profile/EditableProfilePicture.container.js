import { connect } from 'react-redux';
import EditableProfilePicture from './EditableProfilePicture';

import { actions } from 'tingme/store/user';

export default connect(
  ({ user }) => ({ isLoading: user.savingProfilePicture }),
  dispatch => ({
    onSave(image) {
      dispatch(actions.setProfilePicture(image));
    }
  })
)(EditableProfilePicture);
