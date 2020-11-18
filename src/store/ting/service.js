import gql from 'graphql-tag';

import { tingGraphClient as client } from 'tingme/utils/graphClients';

export const ting = async targetId => {
  const mutation = gql`
    mutation ting($targetId: String) {
      ting(targetId: $targetId)
    }
  `;
  const res = await client.mutate({ mutation, variables: { targetId } });
  return res.data.ting;
};

export const acceptRequestFromUser = async senderId => {
  const mutation = gql`
    mutation acceptRequestFromUser($senderId: String) {
      acceptRequestFromUser(senderId: $senderId)
    }
  `;
  const res = await client.mutate({ mutation, variables: { senderId } });
  return res.data.acceptRequestFromUser;
};

export const declineRequestFromUser = async senderId => {
  const mutation = gql`
    mutation declineRequestFromUser($senderId: String) {
      declineRequestFromUser(senderId: $senderId)
    }
  `;
  const res = await client.mutate({ mutation, variables: { senderId } });
  return res.data.declineRequestFromUser;
};

export const cancelRequestToUser = async receiverId => {
  const mutation = gql`
    mutation cancelRequestToUser($receiverId: String) {
      cancelRequestToUser(receiverId: $receiverId)
    }
  `;
  const res = await client.mutate({ mutation, variables: { receiverId } });
  return res.data.cancelRequestToUser;
};

export const getRequests = async () => {
  const query = gql`
    query {
      getRequests {
        id
        profile {
          id
          displayName
          gender
          profilePicture
          featuredBadges
          birthInfo
        }
        receiverId
        senderId
        status
      }
    }
  `;
  const res = await client.query({ query });
  return res.data.getRequests;
};

export const getAcceptedRequests = async () => {
  const query = gql`
    query {
      getAcceptedRequests {
        id
        profile {
          id
          displayName
          gender
          profilePicture
          featuredBadges
          birthInfo
        }
        receiverId
        senderId
      }
    }
  `;
  const res = await client.query({ query });
  return res.data.getAcceptedRequests;
};
