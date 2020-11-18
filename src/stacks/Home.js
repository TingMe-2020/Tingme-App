import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { Home } from 'tingme/screens/home';
import { Profile } from 'tingme/screens/profile';
import { SortBadges } from 'tingme/screens/sortBadges';
import { BasicInfo } from 'tingme/screens/basicInfo';
import LogoutButton from 'tingme/components/LogoutButton';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ screenProps }) => ({
        title: screenProps.t('common:homeScreenTitle'),
        headerRight: <LogoutButton />
      })
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ screenProps }) => ({
        title: screenProps.t('common:profileScreenTitle')
      })
    },
    SortBadges: {
      screen: SortBadges,
      navigationOptions: ({ screenProps }) => ({
        title: screenProps.t('common:sortBadgesScreenTitle')
      })
    },
    BasicInfo: {
      screen: BasicInfo,
      navigationOptions: ({ screenProps }) => ({
        title: screenProps.t('common:basicInfoScreenTitle')
      })
    }
  },
  {
    initialRouteName: 'Home'
  }
);

export default HomeStack;
