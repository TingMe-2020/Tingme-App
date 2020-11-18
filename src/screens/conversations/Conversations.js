import React from 'react';

import { FlatList } from 'react-native';
import { View, Text, Spinner } from 'native-base';

import ConversationItem from './ConversationItem';

import theme from 'tingme/native-base-theme/variables/commonColor';

export default class Conversations extends React.Component {
  componentWillMount() {
    this.props.loadConversations();
  }

  handleConversationPressed(conversationId, unread) {
    const { navigation } = this.props;
    navigation.navigate('ConversationDetail', { conversationId, unread });
  }

  render() {
    const {
      conversations,
      myId,
      screenProps: { t }
    } = this.props;

    if (!conversations) {
      return (
        <View grow center>
          <Spinner />
        </View>
      );
    }

    if (!conversations || !conversations.length) {
      return (
        <View grow center lightBg>
          <Text note>{t('emptyConversationsList')}</Text>
        </View>
      );
    }

    return (
      <View style={{ paddingTop: theme.spacingUnit4 }}>
        <FlatList
          data={conversations}
          renderItem={({ item }) => (
            <ConversationItem
              {...item}
              key={item.id}
              myId={myId}
              onPress={unread => this.handleConversationPressed(item.id, unread)}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}
