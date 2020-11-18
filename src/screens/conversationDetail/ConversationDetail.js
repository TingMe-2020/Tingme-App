import React, { Fragment } from 'react';

import { Platform, Alert } from 'react-native';
import { View, Icon } from 'native-base';

import { GiftedChat, SystemMessage, Bubble, Send, InputToolbar } from 'react-native-gifted-chat';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';

import theme from 'tingme/native-base-theme/variables/commonColor';

const SendButton = () => (
  <View
    card
    style={{
      width: 32,
      height: 32,
      borderRadius: 16,
      marginBottom: 5,
      marginRight: 10
    }}>
    <LinearGradient
      colors={[theme.primaryColorStart, theme.primaryColorEnd]}
      style={{
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16
      }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <Icon name="ios-paper-plane" style={{ color: 'white', fontSize: 16 }} />
    </LinearGradient>
  </View>
);

export default class ConversationDetail extends React.Component {
  async componentDidMount() {
    const { conversationId, targetUserId, onComponentMounted } = this.props;

    await onComponentMounted(conversationId, targetUserId);
  }

  sendMessage = message => {
    const {
      conversationId,
      targetUserId,
      sendMessage,
      currentUser,
      conversation,
      messages
    } = this.props;
    if (conversation.oneSided && messages.length > 0 && currentUser._id == conversation.creatorId) {
      Alert.alert('Chat not allowed', 'You can only send one message before the receiver reply.');
      return;
    }

    sendMessage(message, conversationId, targetUserId, currentUser._id);
  };

  render() {
    const {
      messages,
      currentUser,
      onLoadEarlier,
      conversationId,
      onPressAvatar,
      conversation
    } = this.props;

    return (
      <GiftedChat
        messages={[
          ...(conversation.oneSided
            ? [
                {
                  _id: -1,
                  text: 'You can only send one message before the receiver reply.',
                  createdAt: new Date(),
                  system: true
                }
              ]
            : []),
          ...messages
        ]}
        renderBubble={props => {
          console.log(props);
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: theme.brandPrimary
                }
              }}
            />
          );
        }}
        renderSend={props => (
          <Send {...props}>
            <SendButton />
          </Send>
        )}
        renderSystemMessage={props => <SystemMessage {...props} />}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{ borderTopWidth: 0, marginBottom: theme.spacingUnit }}
            primaryStyle={{ borderTopWidth: 0 }}
          />
        )}
        textInputStyle={{
          borderRadius: 40,
          borderWidth: 1,
          flex: 1,
          paddingLeft: 20,
          paddingRight: 20,
          marginRight: theme.spacingUnit2,
          borderColor: theme.brandLight
        }}
        user={currentUser}
        onPressAvatar={onPressAvatar}
        bottomOffset={Platform.OS === 'ios' ? theme.footerHeight + getBottomSpace() : 0}
        onSend={this.sendMessage}
        loadEarlier={true}
        onLoadEarlier={() => onLoadEarlier && onLoadEarlier(conversationId)}
        keyboardShouldPersistTaps="never"
      />
    );
  }
}
