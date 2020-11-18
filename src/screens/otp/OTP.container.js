import { connect } from 'react-redux';

import { actions } from 'tingme/store/user';

import OTP from './OTP';

const mapState = ({ user }) => ({
	phoneNumber: user.phoneNumber,
	error: user.verifyOTPError,
	isLoading: user.verifyingOTP
});

const mapDispatch = (dispatch, ownProps) => ({
	onFulfill: otp => dispatch(actions.verifyLogin(otp)),
	onResend: () => dispatch(actions.requestLogin(ownProps.phoneNumber))
});

export default connect(
	mapState,
	mapDispatch
)(OTP);
