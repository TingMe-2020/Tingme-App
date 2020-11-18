import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { RequestLogin } from 'tingme/screens/requestLogin';
import { OTP } from 'tingme/screens/otp';

const AuthStack = createStackNavigator(
  {
    RequestLogin: { screen: RequestLogin, navigationOptions: () => ({ header: null }) },
    OTP: {
      screen: OTP,
      navigationOptions: ({ screenProps }) => ({ title: screenProps.t('common:otpScreenTitle') })
    }
  },
  {
    initialRouteName: 'RequestLogin'
  }
);

export default createAppContainer(AuthStack);
