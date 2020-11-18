import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { withInAppNotification } from 'react-native-in-app-notification';
import { connect } from 'react-redux';

import { actions as appActions } from 'tingme/store/app';

const Notification = ({
  eventName,
  key,
  message,
  title,
  createdAt,
  showNotification,
  target,
  onNavigate,
  showingNotification = false
}) => {
  useEffect(
    () => {
      if (showingNotification) {
        showNotification({
          title,
          message,
          createdAt,
          onPress: () => target && onNavigate(target)
        });
      }
    },
    [eventName, key]
  );

  return null;
};

export default connect(
  ({ app: { notification } }) => ({
    ...notification
  }),
  dispatch => ({
    onNavigate: target => dispatch(appActions.setNavigation(target))
  })
)(withInAppNotification(Notification));
