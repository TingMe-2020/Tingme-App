import { connect } from 'react-redux';
import Profile from './Profile';

import { actions } from 'tingme/store/user';

export default connect(
  ({ user }) => {
    return {
      me: user.me,
      profileDetail: user.profileDetail,
      isLoading: user.loadingProfileDetail,
      hasError: user.profileScreenError
    };
  },
  dispatch => ({
    onGetProfileDetail(userId) {
      dispatch(actions.getProfileDetail(userId));
    }
  })
)(Profile);



