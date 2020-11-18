import { connect } from 'react-redux';
import ActionButtons from './ActionButtons';

import { actions } from 'tingme/store/user';

export default connect(
  ({ user }) => ({
    targetId: user.profileDetail.id,
    canTing: user.profileDetail.canTing,
    isWaiting: user.profileDetail.isWaiting,
    bookmarked: user.profileDetail.bookmarked,
    conversationId: user.profileDetail.conversationId
  }),
  dispatch => ({
    onTing(targetId) {
      dispatch(actions.ting(targetId));
    },
    onBlockUser(targetId) {
      dispatch(actions.blockUser(targetId));
    },
    onBookmarkUser(targetId) {
      dispatch(actions.bookmarkUser(targetId));
    }
  })
)(ActionButtons);
