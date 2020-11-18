import gql from 'graphql-tag';

import { conversationGraphClient as client } from 'tingme/utils/graphClients';

export const createConversation = async (targetId, message) => {
  const text = message[0].text;
  const mutation = gql`
    mutation createConversation($targetId: String!, $text: String!) {
      createConversation(targetId: $targetId, initialMessage: $text) {
        id
        conversationPicture
        conversationName
        creatorId
        lastMessage
        lastMessageAt
        lastSeen {
          userId
          seenAt
        }
        memberIds
        members {
          id
          displayName
          profilePicture
          featuredBadges
        }
        oneSided
      }
    }
  `;

  const res = await client.mutate({
    mutation,
    variables: {
      targetId,
      text
    }
  });
  return res.data.createConversation;
};

export const loadConversations = async timestamp => {
  const params = timestamp ? `(timestamp: "${timestamp}")` : '';
  const query = gql`
    query {
      getConversations${params} {
        id
        conversationPicture
        conversationName
        lastMessage
        lastMessageAt
        lastSenderId
        lastSeen {
          userId
          seenAt
        }
        memberIds
        members {
          id
          displayName
          profilePicture
        }
        oneSided
      }
    }
  `;

  const res = await client.query({ query });
  return res.data.getConversations;
};

export const loadConversationWithUser = async targetUserId => {
  const query = gql`
    query getConversationWithUser($targetUserId: String!) {
      getConversationWithUser(targetUserId: $targetUserId) {
        id
        conversationPicture
        conversationName
        creatorId
        lastMessage
        lastMessageAt
        lastSeen {
          userId
          seenAt
        }
        memberIds
        members {
          id
          displayName
          profilePicture
        }
      }
    }
  `;

  const res = await client.query({
    query,
    variables: {
      targetUserId
    }
  });

  return res.data.getConversationWithUser;
};

export const loadMessages = async (conversationId, timestamp) => {
  const params = `(conversationId: "${conversationId}"${
    timestamp ? `, timestamp: "${timestamp}"` : ''
  })`;

  const query = gql`
    query {
      getMessages${params} {
      id
      sender {
        id
        profilePicture
        displayName
      }
      senderId
      conversationId
      content
      createdAt
    }
    }
  `;

  const res = await client.query({ query });
  return res.data.getMessages;
};

export const sendMessage = async (conversationId, message) => {
  const text = message[0].text;
  const mutation = gql`
    mutation sendMessage($conversationId: String!, $text: String!) {
      sendMessage(conversationId: $conversationId, message: $text) {
        id
        sender {
          id
          displayName
          profilePicture
          featuredBadges
        }
        senderId
        conversationId
        content
        createdAt
      }
    }
  `;

  const res = await client.mutate({
    mutation,
    variables: {
      conversationId,
      text
    }
  });
  return res.data.sendMessage;
};
