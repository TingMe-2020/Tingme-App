import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';

import Auth from 'tingme/stacks/Auth';
import Home from 'tingme/stacks/Home';
import Conversation from 'tingme/stacks/Conversation';
import Contact from 'tingme/stacks/Contact';
import FirstTime from 'tingme/stacks/FirstTime';
import Notification from 'tingme/components/Notification';

import BottomBar from 'tingme/components/BottomBar';

import { connect } from 'react-redux';

import useAppStateEffect from 'tingme/utils/useAppStateEffect';

const NavigationHelper = ({ routeName, params, navigation }) => {
  useEffect(() => {
    if (routeName) navigation.navigate(routeName, params);
  }, [routeName, params]);
  return null;
};

const NavigationHelperContainer = connect(({ app }) => ({
  routeName: app.navigation.routeName,
  params: app.navigation.params
}))(NavigationHelper);

const MainStack = createMaterialTopTabNavigator(
  {
    Home: Home,
    Contacts: Contact,
    Conversations: Conversation,
    navigationHelper: NavigationHelperContainer
  },
  {
    initialRouteName: 'Home',
    tabBarComponent: BottomBar,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false
  }
);

const MainStackContainer = createAppContainer(MainStack);

export default ({ authenticated, t, isFirstTime, onReconnectSoket }) => {
  useAppStateEffect((prevAppState, currentAppState) => {
    if (['background', 'inactive'].includes(prevAppState) && currentAppState === 'active') {
      onReconnectSoket();
    }
  });

  return (
    <React.Fragment>
      <Notification />
      {!authenticated && <Auth screenProps={{ t }} />}
      {authenticated && isFirstTime && <FirstTime screenProps={{ t }} isFirstTime={true} />}
      {authenticated && !isFirstTime && <MainStackContainer screenProps={{ t }} />}
    </React.Fragment>
  );
};
