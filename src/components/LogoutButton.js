import React from 'react';
import { Button, Platform } from 'react-native';
import { Button as NbButton, Text } from 'native-base';
import { connect } from 'react-redux';

import { actions as appActions } from 'tingme/store/app';

const LogoutButton = ({ logout }) => {
  if (Platform.OS === 'ios') {
    return <Button title="Logout" onPress={logout} />;
  }
  return (
    <NbButton transparent onPress={logout} style={{ paddingHorizontal: 0, alignItems: 'flex-end' }}>
      <Text style={{ paddingHorizontal: 0 }}>Logout</Text>
    </NbButton>
  );
};

export default connect(null, (dispatch) => ({
  logout: () => dispatch(appActions.logout())
}))(LogoutButton);
