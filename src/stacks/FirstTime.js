import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { BasicInfo } from 'tingme/screens/basicInfo';

const FirstTimeStack = createStackNavigator(
  {
    FirstTime: {
      screen: props => <BasicInfo isFirstTime={true} {...props} />,
      navigationOptions: ({ screenProps }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: 'FirstTime'
  }
);

export default createAppContainer(FirstTimeStack);
