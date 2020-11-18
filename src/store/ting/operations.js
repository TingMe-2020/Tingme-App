import * as tingService from 'tingme/store/ting/service';
import slice from './slice';
import { actions as userActions } from 'tingme/store/user';
import PushNotification from 'react-native-push-notification';

import createOperation from 'tingme/utils/createOperation';

export const getRequests = createOperation({
  actions: {
    successAction: slice.actions.getRequestsSuccess
  },
  process: () => tingService.getRequests(),
  onSuccess: ({ dispatch, getState }) => {
    dispatch(userActions.setUnreadRequestsCount(0));
    PushNotification.setApplicationIconBadgeNumber(getState().user.me.unreadConversationsCount);
  }
});

export const getAcceptedRequests = createOperation({
  actions: {
    successAction: slice.actions.getAcceptedRequestsSuccess
  },
  process: () => tingService.getAcceptedRequests()
});
