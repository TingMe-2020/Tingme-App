import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Conversations } from 'tingme/screens/conversations';
import { ConversationDetail } from 'tingme/screens/conversationDetail';

const ConversationStack = createStackNavigator(
  {
    Conversations: {
      screen: Conversations,
      navigationOptions: ({ screenProps }) => ({
        title: screenProps.t('common:conversationsScreenTitle')
      })
    },
    ConversationDetail: {
      screen: ConversationDetail,
      navigationOptions: ({ screenProps }) => ({
        title: screenProps.t('common:conversationDetailScreenTitle')
      })
    }
  },
  {
    initialRouteName: 'Conversations'
  }
);

export default createAppContainer(ConversationStack);
