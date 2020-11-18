import { createSelector } from 'redux-starter-kit';
export const getConversations = createSelector(['conversation.conversations'], conversations => {
  return Object.values(conversations)
    .map(conversation => ({
      ...conversation,
      lastMessageAt: Number(conversation.lastMessageAt)
    }))
    .sort((c, d) => d.lastMessageAt - c.lastMessageAt);
});

export const getMessages = createSelector(
  ['conversation.messages', 'conversation.currentConversationId'],
  (messages, currentConversationId) => {
    const currentMessages = messages[currentConversationId]
      ? Object.values(messages[currentConversationId])
      : [];
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
            avatar: sender.profilePicture
          }
        };
      })
      .sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        }
        return 1;
      });
  }
);

export const getCurrentUser = createSelector(['user.me'], currentUser => ({
  _id: currentUser.id,
  name: currentUser.displayName,
  avatar: currentUser.profilePicture
}));

export const getCurrentConversationId = createSelector(
  ['conversation.currentConversationId'],
  currentConversationId => currentConversationId
);

export const getConversationById = (state, id) => state.conversation.conversations[id] || {};
