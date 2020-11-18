import { connect } from 'react-redux';
import RequestStatusCard from './RequestStatusCard';

import { actions } from 'tingme/store/user';

export default connect(
	({ user }) => ({
		requestStatus: user.profileDetail.requestStatus,
		isWaiting: user.profileDetail.isWaiting,
		targetId: user.profileDetail.id
	}),
	dispatch => ({
		onCancelRequest(receiverId) {
			dispatch(actions.cancelRequestToUser(receiverId));
		},
		onDeclineRequest(senderId) {
			dispatch(actions.declineRequestFromUser(senderId));
		},
		onAcceptRequest(senderId) {
			dispatch(actions.acceptRequestFromUser(senderId));
		},
		onUnblockUser(targetId) {
			dispatch(actions.unblockUser(targetId));
		}
	})
)(RequestStatusCard);
