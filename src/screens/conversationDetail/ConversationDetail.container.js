import { connect } from 'react-redux';

import { getCurrentUser, getConversationById } from 'tingme/store/conversation/selectors';
import { actions } from 'tingme/store/conversation';
import { actions as appActions } from 'tingme/store/app';

import ConversationDetail from './ConversationDetail';

const noAvatar = require('tingme/asset/logo-gray.png');

const getMessages = (state, conversationId, t) => {
  if (!conversationId) {
    return [{ _id: 1, text: t('common:oneMessageOnly'), system: true, createdAt: new Date() }];
  }
  const { messages } = state.conversation;
  const currentMessages = messages[conversationId] ? Object.values(messages[conversationId]) : [];
  return currentMessages
    .map(message => {
      const { content, createdAt, id, sender } = message;
      return {
        ...message,
        _id: id,
        createdAt: Number(createdAt),
        text: content,
        user: {
          ...sender,
          _id: sender.id,
          name: sender.displayName,
          avatar: sender.profilePicture || noAvatar
        }
      };
    })
    .sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 1;
    });
};

export default connect(
  (state, { navigation, screenProps: { t } }) => {
    const conversationId = navigation.getParam('conversationId');
    const targetUserId = navigation.getParam('targetUserId');
    return {
      messages: getMessages(state, conversationId, t),
      currentUser: getCurrentUser(state),
      conversationId,
      conversation: getConversationById(state, conversationId),
      targetUserId
    };
  },
  (dispatch, { navigation }) => ({
    onComponentMounted: async (conversationId, targetUserId) => {
      const unread = navigation.getParam('unread');
      if (conversationId) {
        dispatch(actions.loadMessages({ conversationId, unread }));
        dispatch((dispatch, getState) => {
          dispatch(actions.markConversationAsRead({ conversationId, myId: getState().user.me.id }));
        });
      } else if (targetUserId) {
        dispatch(actions.loadConversationWithUser({ targetUserId }));
      }
    },
    onLoadEarlier: conversationId =>
      dispatch(async (dispatch, getState) => {
        const messages = getState().conversation.messages[conversationId];
        const oldestTimestamp = Math.min.apply(
          null,
          Object.values(messages).map(m => Number(m.createdAt))
        );
        dispatch(actions.loadMessages({ conversationId, timestamp: oldestTimestamp }));
      }),
    onPressAvatar: user => {
      dispatch(
        appActions.setNavigation({
          routeName: 'Profile',
          params: {
            userId: user._id
          }
        })
      );
    },
    sendMessage: async (message, conversationId, targetUserId, userId) => {
      if (conversationId) {
        dispatch(actions.sendMessage({ conversationId, message, userId }));
      } else {
        await dispatch(actions.createConversation({ targetUserId, message }));
        const conversation = await dispatch(actions.loadConversationWithUser({ targetUserId }));

        if (conversation) {
          navigation.setParams({
            conversationId: conversation.id
          });
        }
      }
    }
  })
)(ConversationDetail);
