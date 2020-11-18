import { connect } from 'react-redux';
import BookmarksTab from './BookmarksTab';

import { actions } from 'tingme/store/user';

export default connect(
  ({ user }) => ({
    bookmarkedUsers: user.bookmarkedUsers
  }),
  dispatch => ({
    onGetBookmarkedUsers() {
      dispatch(actions.getBookmarkedUsers());
    }
  })
)(BookmarksTab);
