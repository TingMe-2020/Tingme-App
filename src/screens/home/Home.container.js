import { connect } from 'react-redux';
import { getNearbyUsers } from 'tingme/store/user/selectors';

import { actions } from 'tingme/store/user';

import Home from './Home';

export default connect(
	state => ({
		nearbyUsers: getNearbyUsers(state),
		me: state.user.me,
		interactionChartData: state.user.interactionChartData,
		isScanning: state.app.isScanning
	}),
	dispatch => ({
		onStartScan: () => dispatch(actions.startScan()),
		onStopScan: () => dispatch(actions.stopScan())
	})
)(Home);
