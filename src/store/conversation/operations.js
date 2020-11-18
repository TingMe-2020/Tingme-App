import createOperation from 'tingme/utils/createOperation';
import PushNotification from 'react-native-push-notification';
import { actions as userActions } from 'tingme/store/user';

import * as conversationService from './service';
import slice from './slice';

export const createConversation = createOperation({
  actions: {},
  process: ({ payload: { targetUserId, message } }) =>
    conversationService.createConversation(targetUserId, message),
  onSuccess: ({ dispatch, result }) => {
    const conversationId = result.id;
    dispatch(loadMessages({ conversationId }));
  }
});

export const loadConversationWithUser = createOperation({
  actions: {
    successAction: slice.actions.loadConversationSuccess
  },
  process: ({ payload: { targetUserId } }) =>
    conversationService.loadConversationWithUser(targetUserId),
  onSuccess: ({ dispatch, result }) => {
    const conversationId = result.id;
    dispatch(loadMessages({ conversationId }));
  }
});

export const loadConversations = createOperation({
  actions: {
    startAction: slice.actions.loadConversationsStart,
    successAction: slice.actions.loadConversationsSuccess,
    failAction: slice.actions.loadConversationsFail
  },
  process: ({ payload: { timestamp } }) => conversationService.loadConversations(timestamp)
});

export const loadMessages = createOperation({
  actions: {
    startAction: slice.actions.loadMessagesStart,
    successAction: slice.actions.loadMessagesSuccess,
    failAction: slice.actions.loadMessagesFail
  },
  process: ({ payload: { conversationId, timestamp, unread }, dispatch, getState }) => {
    if (unread) {
      const meState = getState().user.me;
      let unreadConversationsCount = meState.unreadConversationsCount - 1;
      dispatch(userActions.setUnreadConversationsCount(unreadConversationsCount));
      PushNotification.setApplicationIconBadgeNumber(
        meState.unreadRequestsCount + unreadConversationsCount
      );
    }
    return conversationService.loadMessages(conversationId, timestamp);
  }
});

export const sendMessage = createOperation({
  actions: {
    startAction: slice.actions.sendMessageStart,
    successAction: slice.actions.sendMessageSuccess,
    failAction: slice.actions.sendMessageFail
  },
  process: async ({ payload: { conversationId, message } }) =>
    conversationService.sendMessage(conversationId, message)
});
