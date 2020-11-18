import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Contacts } from 'tingme/screens/contacts';
import { Profile } from 'tingme/screens/profile';

const ContactStack = createStackNavigator(
  {
    Contacts: {
      screen: Contacts,
      navigationOptions: ({ screenProps }) => ({
        title: screenProps.t('common:contactScreenTitle'),
        headerStyle: {
          elevation: 0,
          shadowColor: '#fff',
          shadowOffset: {
            width: 0,
            height: 0
          },
          shadowOpacity: 0,
          shadowRadius: 0
        }
      })
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({ screenProps }) => ({
        title: screenProps.t('common:profileScreenTitle')
      })
    }
  },
  {
    initialRouteName: 'Contacts'
  }
);

export default createAppContainer(ContactStack);
