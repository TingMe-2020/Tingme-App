import { actions as conversationActions } from 'tingme/store/conversation';
import createOperation from 'tingme/utils/createOperation';
import { removeStorageItem } from 'tingme/utils/asyncStorage';

import slice from './slice';

import { actions as userActions } from 'tingme/store/user';

export const handleNotification = createOperation({
  actions: {},
  process: ({ dispatch, getState, payload }) => {
    const { data } = payload;
    const { eventName } = data;

    switch (data.eventName) {
      case 'CONVERSATION_CREATED': {
        const { conversations } = getState().conversation;
        const { conversation } = data;
        if (!conversations[conversation.id]) {
          dispatch(conversationActions.loadConversationsSuccess({ result: [conversation] }));
          if (!data.silence && payload.foreground) {
            dispatch(
              slice.actions.setNotification({
                createdAt: conversation.createdAt,
                message: conversation.lastMessage,
                title: conversation.conversationName,
                showingNotification: true,
                eventName,
                key: conversation.id
              })
            );
          }
        }
        break;
      }
      case 'ACCEPT_TING':
      case 'TING': {
        dispatch(userActions.getProfileDetail(data.senderId));
        if (payload.foreground) {
          dispatch(
            slice.actions.setNotification({
              message: payload.message.body,
              title: payload.message.title,
              showingNotification: true,
              target: {
                routeName: 'Profile',
                params: { userId: data.senderId }
              },
              eventName,
              key: data.senderId
            })
          );
        } else {
          dispatch(
            slice.actions.setNavigation({
              routeName: 'Profile',
              params: { userId: payload.data.senderId }
            })
          );
        }
        break;
      }
      case 'MESSAGE_RECEIVED': {
        const { currentConversationId } = getState().conversation;
        const { conversation, message } = data;
        const conversationId = conversation.id;
        if (currentConversationId === conversationId) {
          dispatch(conversationActions.loadMessagesSuccess({ result: [message] }));
        }
        dispatch(conversationActions.loadConversationsSuccess({ result: [conversation] }));
        if (!data.silence && payload.foreground) {
          dispatch(
            slice.actions.setNotification({
              createdAt: message.createdAt,
              message: message.content,
              title: conversation.conversationName,
              showingNotification: true,
              target: {
                routeName: 'ConversationDetail',
                params: { conversationId }
              },
              eventName,
              key: message.id
            })
          );
        } else {
          dispatch(
            slice.actions.setNavigation({
              routeName: 'ConversationDetail',
              params: { conversationId }
            })
          );
        }
        break;
      }
      default:
        break;
    }
  }
});

export const logout = () => async (dispatch, _, { socketMiddleware }) => {
  await Promise.all([removeStorageItem('me'), removeStorageItem('userToken')]);
  dispatch({
    type: 'USER_LOGOUT'
  });
  socketMiddleware.disconnect();
};

export const reconnectSocket = () => async (dispatch, getState, { socketMiddleware }) => {
  const userState = getState().user;
  if (!userState.me.id) {
    return;
  }

  const socketInstance = socketMiddleware.getInstance();
  if (!socketInstance.connected) {
    socketMiddleware.reconnect(dispatch, getState);
  }
};
