import { connect } from 'react-redux';

import { actions } from 'tingme/store/user';

import RequestLogin from './RequestLogin';

const mapState = ({ user }) => ({ isLoading: user.authenticating, phoneNumber: user.phoneNumber });

const mapDispatch = (dispatch, { navigation }) => ({
  submitPhoneNumber: async phoneNumber => {
    const res = await dispatch(actions.requestLogin(phoneNumber));
    if (res) {
      navigation.navigate('OTP');
    }
  }
});

export default connect(
  mapState,
  mapDispatch
)(RequestLogin);
