import { createSlice } from 'redux-starter-kit';
import userList from 'tingme/utils/data/userList';

const initialState = {
  authenticating: false,
  authenticated: false,
  verifyingOTP: false,
  verifyOTPError: false,
  phoneNumber: '',
  me: {},
  savingBasicInfo: false,
  savingProfilePicture: false,
  nearby: null,
  // nearby: userList,
  profileDetail: { isWaiting: false },
  loadingProfileDetail: false,
  loadProfileDetailError: false,
  availableBadges: null,
  featuredPhotosLoading: false,
  bookmarkedUsers: null
};

const user = createSlice({
  slice: 'user',
  initialState,
  reducers: {
    checkTokenStart: (state, action) => ({
      ...state,
      authenticating: true
    }),

    checkTokenFail: (state, action) => ({
      ...state,
      authenticating: false
    }),

    requestLoginStart: (state, action) => ({
      ...state,
      phoneNumber: action.payload,
      authenticating: true
    }),
    requestLoginSuccess: (state, action) => ({
      ...state,
      authenticating: false
    }),
    requestLoginFail: (state, action) => ({
      ...state,
      authenticating: false,
      requestLoginError: action.payload
    }),

    getMeSuccess: (state, action) => ({
      ...state,
      authenticating: false,
      authenticated: true,
      me: { ...state.me, ...action.payload.result }
    }),
    getMeFail: (state, action) => ({
      ...state,
      authenticating: false
    }),
    getMyProfileSuccess: (state, action) => ({
      ...state,
      me: { ...state.me, ...action.payload.result }
    }),

    verifyLoginStart: (state, action) => ({
      ...state,
      verifyingOTP: true,
      verifyOTPError: false
    }),
    verifyLoginSuccess: (state, action) => ({
      ...state,
      verifyingOTP: false,
      verifyOTPError: false
    }),
    verifyLoginFail: (state, action) => ({
      ...state,
      verifyingOTP: false,
      verifyOTPError: true
    }),

    getProfileDetailStart: (state, action) => ({
      ...state,
      loadingProfileDetail: true,
      loadProfileDetailError: false
    }),
    getProfileDetailSuccess: (state, action) => ({
      ...state,
      loadingProfileDetail: false,
      profileDetail: {
        ...action.payload.result,
        canTing: !['SENT', 'RECEIVED', 'ACCEPTED'].includes(action.payload.result.requestStatus)
      }
    }),
    getProfileDetailFail: (state, action) => ({
      ...state,
      loadingProfileDetail: false,
      loadProfileDetailError: true
    }),

    setBasicInfoStart: (state, action) => ({
      ...state,
      savingBasicInfo: true,
      me: { ...state.me, ...action.payload }
    }),
    setBasicInfoSuccess: (state, action) => ({
      ...state,
      savingBasicInfo: false
    }),
    setBasicInfoFail: (state, action) => ({
      ...state,
      savingBasicInfo: false
    }),

    setProfilePictureStart: (state, action) => ({
      ...state,
      savingProfilePicture: true,
      me: { ...state.me, profilePicture: action.payload.params }
    }),
    setProfilePictureSuccess: (state, action) => ({
      ...state,
      savingProfilePicture: false
    }),
    setProfilePictureFail: (state, action) => ({
      ...state,
      savingProfilePicture: false
    }),

    getNearbySuccess: (state, action) => ({
      ...state,
      nearby: action.payload.result.reduce(
        (nearbyUsers, nearbyUser) => ({ ...nearbyUsers, [nearbyUser.id]: nearbyUser }),
        state.nearby || {}
      )
    }),

    getAvailableBadgesSuccess: (state, action) => ({
      ...state,
      availableBadges: action.payload.result
    }),
    getInteractionsSuccess: (state, action) => ({
      ...state,
      me: { ...state.me, interactions: action.payload.result.getMe.interactions },
      interactionChartData: action.payload.result.getInteractionChartData
    }),

    setFeaturedBadgesStart: (state, action) => ({
      ...state,
      me: { ...state.me, featuredBadges: action.payload.params }
    }),
    setSelectedBadgesStart: (state, action) => ({
      ...state,
      me: { ...state.me, selectdBadges: action.payload.params }
    }),

    setFeaturedPhotoStart: (state, action) => ({
      ...state,
      featuredPhotosLoading: true
    }),
    setFeaturedPhotoSuccess: (state, action) => ({
      ...state,
      featuredPhotosLoading: false
    }),
    setFeaturedPhotoFail: (state, action) => ({
      ...state,
      featuredPhotosLoading: false
    }),

    tingStart: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        canTing: false
      }
    }),
    tingSuccess: (state, action) => {
      if (state.profileDetail.id === action.payload.params) {
        return { ...state, profileDetail: { ...state.profileDetail, requestStatus: 'SENT' } };
      }
      return state;
    },
    tingFail: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        canTing: true
      }
    }),

    cancelRequestToUserStart: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: true
      }
    }),

    cancelRequestToUserSuccess: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false,
        requestStatus: 'NONE',
        canTing: true
      }
    }),
    cancelRequestToUserFail: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false
      }
    }),
    acceptRequestFromUserStart: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: true
      }
    }),
    acceptRequestFromUserSuccess: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false,
        requestStatus: 'ACCEPTED'
      }
    }),
    acceptRequestFromUserFail: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false
      }
    }),
    declineRequestFromUserStart: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: true
      }
    }),
    declineRequestFromUserSuccess: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false,
        requestStatus: 'NONE',
        canTing: true
      }
    }),
    declineRequestFromUserFail: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false
      }
    }),
    blockUserStart: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: true,
        canTing: false
      }
    }),
    blockUserSuccess: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false,
        requestStatus: 'BLOCKED'
      }
    }),
    blockUserFail: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false,
        canTing: true
      }
    }),
    unblockUserStart: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: true
      }
    }),
    unblockUserSuccess: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false,
        canTing: true,
        requestStatus: 'NONE'
      }
    }),
    unblockUserFail: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false
      }
    }),
    bookmarkUserStart: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: true
      }
    }),
    bookmarkUserSuccess: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false,
        bookmarked: true
      }
    }),
    bookmarkUserFail: (state, action) => ({
      ...state,
      profileDetail: {
        ...state.profileDetail,
        isWaiting: false
      }
    }),

    getBookmarkedUsersSuccess: (state, action) => ({
      ...state,
      bookmarkedUsers: action.payload.result
    }),

    setUnreadRequestsCount: (state, action) => ({
      ...state,
      me: { ...state.me, unreadRequestsCount: action.payload }
    }),
    setUnreadConversationsCount: (state, action) => ({
      ...state,
      me: { ...state.me, unreadConversationsCount: action.payload }
    })
  }
});

export default user;
