import {actions as appActions} from 'tingme/store/app';
import {actions as tingActions} from 'tingme/store/ting';
import PushNotification from 'react-native-push-notification';

import {setToken} from 'tingme/utils/graphClients';
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from 'tingme/utils/asyncStorage';
import createOperation from 'tingme/utils/createOperation';
import initPush from 'tingme/utils/pushNotification';

import TraceManager, {traceEventEmitter} from 'react-native-trace-manager';

import * as userService from './service';
import * as tingService from 'tingme/store/ting/service';
import slice from './slice';

export const requestLogin = createOperation({
  actions: {
    startAction: slice.actions.requestLoginStart,
    successAction: slice.actions.requestLoginSuccess,
    failAction: slice.actions.requestLoginFail,
  },
  process: ({payload: phoneNumber}) => userService.requestLogin(phoneNumber),
});

const checkStoredMe = createOperation({
  actions: {successAction: slice.actions.getMeSuccess},
  process: async () => {
    let me = await getStorageItem('me');
    if (me) {
      me = JSON.parse(me);
      return me;
    }
    throw new Error('No stored personal data!');
  },
});

export const checkToken = createOperation({
  actions: {
    startAction: slice.actions.scheckTokenStart,
    failAction: slice.actions.checkTokenFail,
  },
  process: async ({dispatch, getState}) => {
    const token = await getStorageItem('userToken');
    if (token) {
      setToken(token);
      const storedMe = await dispatch(checkStoredMe());
      if (storedMe) {
        await dispatch(getMe());
        await dispatch(getInteractions());
      } else {
        await dispatch(getMe());
        await dispatch(getInteractions());
      }
      TraceManager.init();
      TraceManager.startAdvertising(getState().user.me.id);
      traceEventEmitter.addListener('userChanged', ({users}) => {
        let ids = [];
        const nearby = getState().user.nearby;
        if (!nearby) {
          ids = users.map((user) => user.name);
        } else {
          users.forEach((user) => {
            if (!nearby[user.name]) {
              ids.push(user.name);
            }
          });
        }

        if (ids.length > 0) {
          dispatch(getNearby(ids));
        }
      });
    }
    throw new Error('Invalid token');
  },
});

let userChangeSubscriber;
export const startScan = () => async (dispatch, getState) => {
  dispatch(appActions.setScanning(true));
  TraceManager.startDiscovering();
  return;
};

export const stopScan = () => async (dispatch) => {
  dispatch(appActions.setScanning(false));
  TraceManager.stopDiscovering();
};

export const getMe = createOperation({
  actions: {
    successAction: slice.actions.getMeSuccess,
    failAction: slice.actions.getMeFail,
  },
  process: async () => await userService.getMe(),
  onSuccess: async ({dispatch, getState, socketMiddleware, result}) => {
    const me = getState().user.me;
    setStorageItem('me', JSON.stringify(me));
    if (me.id) {
      socketMiddleware.addListeners(dispatch, getState);
      const pushToken = await initPush((notification) =>
        dispatch(appActions.handleNotification({...notification})),
      );
      dispatch(setPushToken(pushToken.token));
    } else {
      setToken(undefined);
      removeStorageItem('userToken');
    }

    PushNotification.setApplicationIconBadgeNumber(
      result.unreadRequestsCount + result.unreadConversationsCount,
    );
    dispatch(
      appActions.setNotification({
        title: 'Click here to go to your profile',
        message: 'Click here to go to your profile',
        showingNotification: true,
        target: {
          routeName: 'Profile',
          params: {
            userId: getState().user.me.id,
          },
        },
      }),
    );
  },
  onError: () => {
    setToken(undefined);
    removeStorageItem('userToken');
  },
});

export const getInteractions = createOperation({
  actions: {successAction: slice.actions.getInteractionsSuccess},
  process: async () => userService.getInteractions(),
  onSuccess: async ({dispatch}) => {
    // TODO: Fix setTimeout error long duration
    // const delay = 1000 * 60 * 60 * 4
    const delay = 1000 * 60 * 5;
    setTimeout(() => dispatch(getInteractions()), delay);
  },
});

export const getMyProfile = createOperation({
  actions: {successAction: slice.actions.getMyProfileSuccess},
  process: async () => userService.getMyProfile(),
});

export const verifyLogin = createOperation({
  actions: {
    startAction: slice.actions.verifyLoginStart,
    successAction: slice.actions.verifyLoginSuccess,
    failAction: slice.actions.verifyLoginFail,
  },
  process: async ({payload: otp, dispatch, getState}) => {
    const {phoneNumber} = getState().user;
    const result = await userService.verifyLogin(phoneNumber, otp);

    if (result.success) {
      setToken(result.token);
      await setStorageItem('userToken', result.token);
      await dispatch(checkToken());
      return true;
    }
    return false;
  },
});

export const setBasicInfo = createOperation({
  actions: {
    startAction: slice.actions.setBasicInfoStart,
    successAction: slice.actions.setBasicInfoSuccess,
    failAction: slice.actions.setBasicInfoFail,
  },
  process: async ({payload: info}) => userService.setBasicInfo(info),
  onSuccess: ({dispatch}) => dispatch(getMyProfile()),
});

export const setProfilePicture = createOperation({
  actions: {
    startAction: slice.actions.setProfilePictureStart,
    successAction: slice.actions.setProfilePictureSuccess,
    failAction: slice.actions.setProfilePictureFail,
  },
  process: ({payload: image}) => userService.setProfilePicture(image),
  onSuccess: ({dispatch}) => dispatch(getMyProfile()),
});

export const getNearby = createOperation({
  actions: {successAction: slice.actions.getNearbySuccess},
  process: ({payload: ids}) => userService.getNearby(ids),
});

export const getProfileDetail = createOperation({
  actions: {
    startAction: slice.actions.getProfileDetailStart,
    successAction: slice.actions.getProfileDetailSuccess,
    failAction: slice.actions.getProfileDetailFail,
  },
  process: ({payload: userId}) => userService.getProfileDetail(userId),
});

export const getAvailableBadges = createOperation({
  actions: {successAction: slice.actions.getAvailableBadgesSuccess},
  process: () => userService.getAvailableBadges(),
});

export const setFeaturedBadges = createOperation({
  actions: {
    startAction: slice.actions.setFeaturedBadgesStart,
    successAction: slice.actions.setFeaturedBadgesSuccess,
  },
  process: ({payload: badges}) => userService.setFeaturedBadges(badges),
  onSuccess: ({dispatch}) => dispatch(getMyProfile()),
});

export const setSelectedBadges = createOperation({
  actions: {
    startAction: slice.actions.setSelectedBadgesStart,
    successAction: slice.actions.setSelectedBadgesSuccess,
  },
  process: ({payload: badges}) => userService.setSelectedBadges(badges),
  onSuccess: ({dispatch}) => dispatch(getMyProfile()),
});

export const setFeaturedPhoto = createOperation({
  actions: {
    startAction: slice.actions.setFeaturedPhotoStart,
    successAction: slice.actions.setFeaturedPhotoSuccess,
    failAction: slice.actions.setFeaturedPhotoFail,
  },
  process: ({payload: {image, index}}) =>
    userService.setFeaturedPhoto(image, index),
  onSuccess: ({dispatch}) => dispatch(getMyProfile()),
});

export const ting = createOperation({
  actions: {
    startAction: slice.actions.tingStart,
    successAction: slice.actions.tingSuccess,
    failAction: slice.actions.tingFail,
  },
  requireConfirm: true,
  process: ({payload: targetId}) => tingService.ting(targetId),
});

export const cancelRequestToUser = createOperation({
  actions: {
    startAction: slice.actions.cancelRequestToUserStart,
    successAction: slice.actions.cancelRequestToUserSuccess,
    failAction: slice.actions.cancelRequestToUserFail,
  },
  requireConfirm: true,
  process: ({payload: receiverId}) =>
    tingService.cancelRequestToUser(receiverId),
});

export const acceptRequestFromUser = createOperation({
  actions: {
    startAction: slice.actions.acceptRequestFromUserStart,
    successAction: slice.actions.acceptRequestFromUserSuccess,
    failAction: slice.actions.acceptRequestFromUserFail,
  },
  requireConfirm: true,
  process: ({payload: senderId}) => tingService.acceptRequestFromUser(senderId),
  onSuccess: ({dispatch}) => dispatch(tingActions.getRequests()),
});

export const declineRequestFromUser = createOperation({
  actions: {
    startAction: slice.actions.declineRequestFromUserStart,
    successAction: slice.actions.declineRequestFromUserSuccess,
    failAction: slice.actions.declineRequestFromUserFail,
  },
  requireConfirm: true,
  process: ({payload: senderId}) =>
    tingService.declineRequestFromUser(senderId),
});

export const blockUser = createOperation({
  actions: {
    startAction: slice.actions.blockUserStart,
    successAction: slice.actions.blockUserSuccess,
    failAction: slice.actions.blockUserFail,
  },
  requireConfirm: true,
  process: ({payload: targetId}) => userService.blockUser(targetId),
});

export const unblockUser = createOperation({
  actions: {
    startAction: slice.actions.unblockUserStart,
    successAction: slice.actions.unblockUserSuccess,
    failAction: slice.actions.unblockUserFail,
  },
  requireConfirm: true,
  process: ({payload: targetId}) => userService.unblockUser(targetId),
});

export const bookmarkUser = createOperation({
  actions: {
    startAction: slice.actions.bookmarkUserStart,
    successAction: slice.actions.bookmarkUserSuccess,
    failAction: slice.actions.bookmarkUserFail,
  },
  requireConfirm: true,
  process: ({payload: targetId}) => userService.bookmarkUser(targetId),
  onSuccess: ({dispatch}) => dispatch(getBookmarkedUsers()),
});

export const setPushToken = createOperation({
  actions: {},
  process: ({payload: pushToken}) => userService.setPushToken(pushToken),
});

export const getBookmarkedUsers = createOperation({
  actions: {successAction: slice.actions.getBookmarkedUsersSuccess},
  process: () => userService.getBookmarkedUsers(),
});
