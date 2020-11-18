import { createSlice } from 'redux-starter-kit';

const initialState = {
  conversations: null,
  conversationsError: null,
  conversationsLoading: false,
  currentConversationId: null,
  messages: {},
  messagesError: null,
  messagesLoading: false
};

export default createSlice({
  slice: 'conversation',
  initialState,
  reducers: {
    createConversationSuccess: (state, action) => {
      const conversation = action.payload.result;
      return {
        ...state,
        conversations: {
          [conversation.id]: conversation,
          ...state.conversations
        }
      };
    },
    loadConversationSuccess: (state, action) => {
      const conversation = action.payload.result;
      return {
        ...state,
        conversations: {
          [conversation.id]: conversation,
          ...state.conversations
        }
      };
    },
    markConversationAsRead: (state, action) => {
      const { conversationId, myId } = action.payload;
      let conversation = state.conversations[conversationId];

      conversation = {
        ...conversation,
        lastSeen: [{ userId: myId, seenAt: Date.now() }]
      };

      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: conversation
        }
      };
    },
    loadConversationsStart: state => ({
      ...state,
      conversationsLoading: true
    }),
    loadConversationsSuccess: (state, action) => ({
      ...state,
      conversations: action.payload.result.reduce(
        (conversations, conversation) => ({ ...conversations, [conversation.id]: conversation }),
        state.conversations || {}
      ),
      conversationsLoading: false
    }),
    loadConversationsFail: (state, action) => ({
      ...state,
      conversationsError: action.payload.error,
      conversationsLoading: false
    }),
    loadMessagesStart: (state, action) => ({
      ...state,
      currentConversationId: action.payload.conversationId,
      messagesLoading: true
    }),
    loadMessagesSuccess: (state, action) => {
      const { messages, currentConversationId } = state;
      const currentMessages = messages[currentConversationId] || {};
      const currentMessagesWithOutTemp = Object.values(currentMessages).reduce(
        (messagesObj, message) => {
          if (message.temp) {
            return messagesObj;
          }
          return {
            ...messagesObj,
            [message.id]: message
          };
        },
        {}
      );
      return {
        ...state,
        messages: {
          ...messages,
          [currentConversationId]: action.payload.result.reduce(
            (messagesObj, message) => ({
              ...messagesObj,
              [message.id]: message
            }),
            currentMessagesWithOutTemp
          )
        },
        messagesLoading: false
      };
    },
    loadMessagesError: (state, action) => ({
      ...state,
      messagesError: action.payload.error,
      messagesLoading: false
    }),
    sendMessageStart: (state, action) => {
      const { messages } = state;
      const { conversationId, message } = action.payload;
      const { _id, text, user } = message[0];
      return {
        ...state,
        messages: {
          ...messages,
          [conversationId]: {
            ...messages[conversationId],
            [_id]: {
              temp: true,
              id: _id,
              content: text,
              sender: {
                id: user._id,
                displayName: user.name,
                profilePicture: user.avatar
              },
              createdAt: new Date().getTime()
            }
          }
        },
        messageLoading: true
      };
    },
    sendMessageSuccess: (state, action) => {
      const { messages, currentConversationId } = state;
      const message = action.payload.result;
      const currentMessages = messages[currentConversationId] || {};
      const currentMessagesWithOutTemp = Object.values(currentMessages).reduce(
        (messagesObj, message) => {
          if (message.temp) {
            return messagesObj;
          }
          return {
            ...messagesObj,
            [message.id]: message
          };
        },
        {}
      );
      const newState = {
        ...state,
        conversations: {
          ...state.conversations,
          [currentConversationId]: {
            ...state.conversations[currentConversationId],
            lastSenderId: action.payload.params.userId
          }
        },
        messageLoading: false,
        messages: {
          ...messages,
          [currentConversationId]: {
            ...currentMessagesWithOutTemp,
            [message.id]: message
          }
        }
      };
      return newState;
    },
    sendMessageFail: (state, action) => ({
      ...state,
      messageLoading: false,
      messageError: action.payload.error
    })
  }
});
