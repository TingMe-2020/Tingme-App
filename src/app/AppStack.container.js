import { connect } from 'react-redux';

import AppStack from './AppStack';
import { actions } from 'tingme/store/app';

export default connect(
	({ user, app }) => ({
		authenticated: user.authenticated,
		isFirstTime: !user.me.displayName
	}),
	dispatch => ({
		onReconnectSoket: () => dispatch(actions.reconnectSocket())
	})
)(AppStack);
