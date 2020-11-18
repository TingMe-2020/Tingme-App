import gql from 'graphql-tag';

import { userGraphClient as client } from 'tingme/utils/graphClients';

export const requestLogin = async phoneNumber => {
  const query = gql`
    query {
      requestLogin(phoneNumber: "${phoneNumber}")
    }
  `;
  const res = await client.query({
    query
  });
  return res.data.requestLogin;
};

export const verifyLogin = async (phoneNumber, otp) => {
  const query = gql`
    query {
      verifyLogin(phoneNumber: "${phoneNumber}", otp: "${otp}") {
        success
        token
      }
    }
  `;
  const res = await client.query({
    query
  });
  return res.data.verifyLogin;
};

export const getInteractions = async () => {
  const query = gql`
    query {
      getInteractionChartData {
        startTime
        scanCount
        profileViewCount
      }
      getMe {
        id
        interactions {
          totalScanCount
          todayScanCount
          totalProfileViewCount
          todayProfileViewCount
        }
      }
    }
  `;
  const res = await client.query({ query });
  return res.data;
};

export const getMe = async () => {
  const query = gql`
    query {
      getMe {
        id
        displayName
        profilePicture
        featuredBadges
        selectedBadges
        featuredPhotos
        description
        birthday
        birthdayVisibility
        gender
        unreadRequestsCount
        unreadConversationsCount
        interactions {
          totalScanCount
          todayScanCount
          totalProfileViewCount
          todayProfileViewCount
        }
      }
    }
  `;
  const res = await client.query({ query });
  let data = res.data.getMe;
  if (data.birthday) {
    data.birthday = parseFloat(data.birthday);
  }
  return data;
};

export const getMyProfile = async () => {
  const query = gql`
    query {
      getMe {
        id
        displayName
        profilePicture
        featuredBadges
        selectedBadges
        featuredPhotos
        description
        birthday
        birthdayVisibility
        gender
      }
    }
  `;
  const res = await client.query({ query });
  let data = res.data.getMe;
  if (data.birthday) {
    data.birthday = parseFloat(data.birthday);
  }
  return data;
};

export const getNearby = async ids => {
  const query = gql`
    query getNearBy($ids: [String]) {
      getNearBy(ids: $ids) {
        id
        displayName
        profilePicture
        featuredBadges
        birthInfo
        gender
      }
    }
  `;
  const res = await client.query({ query, variables: { ids } });
  return res.data.getNearBy;
};

export const setBasicInfo = async info => {
  let formData = { ...info, birthday: info.birthday ? info.birthday.toString() : null };
  const mutation = gql`
    mutation setBasicInfo($info: BasicInfo) {
      setBasicInfo(basicInfo: $info)
    }
  `;
  const res = await client.mutate({ mutation, variables: { info: formData } });
  return res.data.setBasicInfo;
};

export const setProfilePicture = async image => {
  const mutation = gql`
    mutation setProfilePicture($image: String) {
      setProfilePicture(picture: $image)
    }
  `;
  const res = await client.mutate({ mutation, variables: { image } });
  return res.data.setProfilePicture;
};

export const setFeaturedPhoto = async (image, index) => {
  const mutation = gql`
    mutation setFeaturedPhoto($image: String, $index: Int) {
      setFeaturedPhoto(image: $image, index: $index)
    }
  `;
  const res = await client.mutate({ mutation, variables: { image, index } });
  return res.data.setFeaturedPhoto;
};

export const getProfileDetail = async userId => {
  const query = gql`
    query getProfileDetail($id: String) {
      getProfileDetail(id: $id) {
        id
        displayName
        profilePicture
        featuredBadges
        selectedBadges
        featuredPhotos
        description
        gender
        birthInfo
        requestStatus
        bookmarked
        conversationId
      }
    }
  `;
  const res = await client.query({ query, variables: { id: userId } });
  return res.data.getProfileDetail;
};

export const getAvailableBadges = async () => {
  const query = gql`
    query {
      getAvailableBadges
    }
  `;
  const res = await client.query({ query });
  return res.data.getAvailableBadges;
};

export const setFeaturedBadges = async badges => {
  const mutation = gql`
    mutation setFeaturedBadges($badges: [String]) {
      setFeaturedBadges(badges: $badges)
    }
  `;
  const res = await client.mutate({ mutation, variables: { badges } });
  return res.data.setFeaturedBadges;
};

export const setSelectedBadges = async badges => {
  const mutation = gql`
    mutation setSelectedBadges($badges: [String]) {
      setSelectedBadges(badges: $badges)
    }
  `;
  const res = await client.mutate({ mutation, variables: { badges } });
  return res.data.setSelectedBadges;
};

export const blockUser = async targetId => {
  const mutation = gql`
    mutation blockUser($targetId: String) {
      blockUser(targetId: $targetId)
    }
  `;
  const res = await client.mutate({ mutation, variables: { targetId } });
  return res.data.blockUser;
};

export const unblockUser = async targetId => {
  const mutation = gql`
    mutation unblockUser($targetId: String) {
      unblockUser(targetId: $targetId)
    }
  `;
  const res = await client.mutate({ mutation, variables: { targetId } });
  return res.data.unblockUser;
};

export const bookmarkUser = async targetId => {
  const mutation = gql`
    mutation bookmarkUser($targetId: String) {
      bookmarkUser(targetId: $targetId)
    }
  `;
  const res = await client.mutate({ mutation, variables: { targetId } });
  return res.data.bookmarkUser;
};

export const setPushToken = async pushToken => {
  const mutation = gql`
    mutation setPushToken($pushToken: String) {
      setPushToken(pushToken: $pushToken)
    }
  `;
  const res = await client.mutate({ mutation, variables: { pushToken } });
  return res.data.setPushToken;
};

export const getBookmarkedUsers = async () => {
  const query = gql`
    query {
      getBookmarkedUsers {
        id
        displayName
        gender
        profilePicture
        featuredBadges
        birthInfo
      }
    }
  `;
  const res = await client.query({ query });
  return res.data.getBookmarkedUsers;
};
